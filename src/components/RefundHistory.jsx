import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import axios from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import EmptyState from "./EmptyState";

function RefundHistory() {
  const [refunds, setRefunds] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchedCustomerName, setFetchedCustomerName] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRefundsAndPayments = async () => {
      try {
        const [refundRes, paymentRes] = await Promise.all([
          axios.get("/refunds"),
          axios.get("/payments"),
        ]);

        setRefunds(refundRes.data);
        setPayments(paymentRes.data);

        // Extract unique customer names for filtering
        const uniqueNames = paymentRes.data.map((p) => ({
          orderId: p.orderId?._id || p.orderId,
          customerName: p.customerName || "",
        }));
        setFetchedCustomerName(uniqueNames);
      } catch (error) {
        console.error("Error fetching refund history or payments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRefundsAndPayments();
  }, []);

  const getCustomerInfo = (orderId) => {
    const payment = payments.find(
      (p) => p.orderId?._id === orderId?._id || p.orderId === orderId?._id
    );
    return {
      customerName: payment?.customerName || "N/A",
      mobileNumber: payment?.mobileNumber || "N/A",
    };
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US");
  };

  const viewReceipt = (refundId) => {
    localStorage.setItem("receiptType", "refund");
    localStorage.setItem("latestRefundId", refundId);
    navigate("/receipt");
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  // Filter refunds by matching customer name
  const filteredRefunds = refunds.filter((refund) => {
    const payment = payments.find(
      (p) =>
        p.orderId === refund.orderId?._id ||
        p.orderId?._id === refund.orderId?._id
    );
    return payment?.customerName?.toLowerCase().includes(searchTerm);
  });

  return (
    <div className="flex min-h-screen text-black">
      <main className="flex-1 bg-gray-50 p-6">
        <div className="justify-between items-center mb-4">
          <SearchBar
            onSearch={handleSearch}
            searchText="Search the Customer..."
          />
        </div>

        <div className="overflow-auto rounded shadow-sm">
          {loading ? (
            <Loading message="Loading Refund History" />
          ) : filteredRefunds.length === 0 ? (
            <EmptyState message="No refunds found for this customer." />
          ) : (
            <>
              <h2 className="text-black pb-5 font-bold">Refund History</h2>
              <table className="min-w-full text-sm border border-gray-300 bg-white">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="p-2 border">#</th>
                    <th className="p-2 border">Order Number</th>
                    <th className="p-2 border">Customer Name</th>
                    <th className="p-2 border">Mobile</th>
                    <th className="p-2 border">Refunded Amount</th>
                    <th className="p-2 border">Refund Date</th>
                    <th className="p-2 border">View Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRefunds.map((refund, index) => {
                    const { customerName, mobileNumber } = getCustomerInfo(
                      refund.orderId
                    );

                    return (
                      <tr key={refund._id} className="hover:bg-gray-50">
                        <td className="p-2 border">{index + 1}</td>
                        <td className="p-2 border">
                          {refund.orderId?.orderNumber?.slice(-14) || "N/A"}
                        </td>
                        <td className="p-2 border">{customerName}</td>
                        <td className="p-2 border">{mobileNumber}</td>
                        <td className="p-2 border">
                          {refund.totalRefundAmount.toFixed(2)}
                        </td>
                        <td className="p-2 border">
                          {formatDate(refund.refundDate)}
                        </td>
                        <td className="p-2 border flex justify-center items-center">
                          <img
                            className="h-6 w-6 cursor-pointer"
                            src="https://tse1.mm.bing.net/th/id/OIP.gNmby9tjHxodyMl2QFpR7gAAAA?pid=Api"
                            alt="Receipt"
                            onClick={() => {
                              viewReceipt(refund?._id);
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default RefundHistory;
