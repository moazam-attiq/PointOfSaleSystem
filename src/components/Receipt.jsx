import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";
import { useToast } from "../context/ToastContext";

const Receipt = () => {
  const [order, setOrder] = useState(null);
  const [payment, setPayment] = useState(null);
  const [refund, setRefund] = useState(null);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const goToDashboard = () => {
    localStorage.removeItem("latestOrderId");
    localStorage.removeItem("receiptType");
    localStorage.removeItem("latestRefundId");
    navigate("/dashboard");
  };

  useEffect(() => {
    const fetchData = async () => {
      const type = localStorage.getItem("receiptType");

      try {
        if (type === "refund") {
          const refundId = localStorage.getItem("latestRefundId");
          if (!refundId) return showToast("No refund ID found", "danger");

          const res = await axios.get(`/refunds/${refundId}`);
          setRefund(res.data);

          const paymentRes = await axios.get(
            `/payments/order/${res.data.orderId._id}`
          );
          setPayment(paymentRes.data);
        } else {
          const orderId = localStorage.getItem("latestOrderId");
          if (!refundId) return showToast("No order ID found", "danger");

          const [orderRes, paymentRes] = await Promise.all([
            axios.get(`/orders/${orderId}`),
            axios.get(`/payments/order/${orderId}`),
          ]);
          setOrder(orderRes.data);
          setPayment(paymentRes.data);
        }
      } catch (err) {
        if (!refundId)
          return showToast(
            "Error fetching receipt data: " +
              (err.response?.data?.message || err.message),
            "danger"
          );
      }
    };

    fetchData();
  }, []);

  const isRefund = !!refund;

  const headerText = isRefund ? "REFUND RECEIPT" : "SALES RECEIPT";
  const displayItems = isRefund ? refund.refundedItems : order?.cartItems;
  const customerName = payment?.customerName;
  const mobileNumber = payment?.mobileNumber;
  const totalAmount = isRefund ? -refund.totalRefundAmount : order?.totalAmount;
  const amountReceived = isRefund
    ? refund.totalRefundAmount
    : payment?.amountReceived;
  const changeGiven = isRefund ? 0 : payment?.changeGiven;
  const date = isRefund ? refund.refundDate : order?.date;
  const invoice = isRefund
    ? refund.orderId?.orderNumber.slice(-14)
    : order?.orderNumber?.slice(-14);

  if ((isRefund && !refund) || (!isRefund && (!order || !payment))) {
    return (
      <div className="min-h-screen bg-[#749BC2] flex items-center justify-center">
        <p className="text-white text-lg">⏳ Loading receipt...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#749BC2] min-h-screen w-full flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white text-black shadow-lg rounded-lg p-6 w-full max-w-md text-sm flex flex-col justify-center">
        <div className="text-center mb-4">
          <button
            onClick={goToDashboard}
            style={{ background: "#4682A9" }}
            className="w-full sm:w-auto mb-4 text-white px-4 py-2 rounded shadow"
          >
            Return to Dashboard
          </button>
          <img
            src="/images/logo.png"
            alt="POS_Logo"
            className="h-16 w-16 rounded-full mx-auto mb-2 border-2 border-[#4682A9] shadow"
          />
          <h2 className="text-xl sm:text-2xl font-bold">{headerText}</h2>
        </div>

        <div className="mb-4 space-y-1 text-xs sm:text-sm">
          <p>
            <strong>Invoice No:</strong> # {invoice}
          </p>
          <p>
            <strong>Date:</strong> {new Date(date).toLocaleString()}
          </p>
          <p>
            <strong>Cashier:</strong> Admin
          </p>
          <p>
            <strong>Customer Name:</strong> {customerName}
          </p>
          <p>
            <strong>Contact:</strong> {mobileNumber}
          </p>
        </div>

        <div className="overflow-x-auto mb-4">
          <table className="w-full border border-gray-300 text-left text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border border-gray-300">Item Name</th>
                <th className="p-2 border border-gray-300">Price</th>
                <th className="p-2 border border-gray-300">Qty</th>
                <th className="p-2 border border-gray-300">Total</th>
              </tr>
            </thead>
            <tbody>
              {displayItems.map((item, idx) => (
                <tr key={idx}>
                  <td className="p-2 border border-gray-300">
                    {item.productName || item.productId?.productName}
                  </td>
                  <td className="p-2 border border-gray-300">
                    Rs. {item.resalePrice || item.productId?.resalePrice}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {item.quantity}
                  </td>
                  <td className="p-2 border border-gray-300">
                    Rs.{" "}
                    {(item.resalePrice || item.productId?.resalePrice) *
                      item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-right mb-4 space-y-1 text-xs sm:text-sm">
          <p>
            <strong>Total:</strong> Rs. {totalAmount}
          </p>
          <p>
            <strong>{isRefund ? "Amount Refunded" : "Amount Received"}:</strong>{" "}
            Rs. {amountReceived}
          </p>
          {!isRefund && (
            <p>
              <strong>Change:</strong> Rs. {changeGiven}
            </p>
          )}
        </div>

        <div className="text-center text-xs border-t pt-3 sm:text-sm">
          <p className="font-semibold">Point of Sale System</p>
          <p>📍 Point of Sale Chowk, GIFT University, Pakistan</p>
          <p>📞 Phone: 0300-3030300</p>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
