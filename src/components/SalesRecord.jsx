import React from "react";
import SearchBar from "./SearchBar";
import axios from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";


 function SalesRecord() {
  const [salesData, setSalesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await axios.get("/payments/getSales");
        console.log("Sales Response: ", res.data);
        setSalesData(res.data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    }

    fetchSales();
  }, [])

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const filteredData = salesData.filter((item) =>
    item.customerName.toLowerCase().includes(searchTerm)
  );

  const viewReceipt = (orderId) => {
    localStorage.setItem("latestOrderId", orderId);
    navigate("/receipt");
  };
  return (
    <div className="flex min-h-screen text-black">
      <main className="flex-1 bg-gray-50 p-6">
        {/* Search & Buttons */}
        <div className="justify-between items-center mb-4">
          <SearchBar searchText="Search the Customer..." onSearch={handleSearch}/>         
        </div>

        {/* Table */}
        <div className="overflow-auto rounded shadow-sm">
          <h2 className="text-black pb-5 font-bold">Sales Record</h2>
          <table className="min-w-full text-sm border border-gray-300 bg-white">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2 border">Order ID</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Customer Name</th>
                <th className="p-2 border">Contact</th>
                <th className="p-2 border">Total Amount</th>
                <th className="p-2 border">Paid Amount</th>
                <th className="p-2 border">Due Amount</th>
                <th className="p-2 border">View Reciept</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-2 border">{item.orderNumber?.slice(-14)}</td>
                  <td className="p-2 border">{item.date}</td>
                  <td className="p-2 border">{item.customerName}</td>
                  <td className="p-2 border">{item.contact}</td>
                  <td className="p-2 border">{item.totalAmount.toFixed(2)}</td>
                  <td className="p-2 border">{item.paidAmount.toFixed(2)}</td>
                  <td className="p-2 border">{item.due.toFixed(2)}</td>

                  <td className="p-2 border justify-center items-center ">
                    <div className="flex justify-center cursor-pointer" onClick={() => {viewReceipt(item.orderId)}}>
                      <img className="h-6 w-6" src="https://tse1.mm.bing.net/th/id/OIP.gNmby9tjHxodyMl2QFpR7gAAAA?pid=Api" alt="Receipt" />                    
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default SalesRecord;