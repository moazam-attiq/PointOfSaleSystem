import React from "react";
import SearchBar from "./SearchBar";

const salesData = [
  { name: "ItemName", date: "12-12-2012", customerName: "CustomerName", contact: "0300-3030300", totalAmount: 789, paidAmount: 1000, due: 211, profit: 289 },
  { name: "ItemName", date: "12-12-2012", customerName: "CustomerName", contact: "0300-3030300", totalAmount: 789, paidAmount: 1000, due: 211, profit: 289 },
  { name: "ItemName", date: "12-12-2012", customerName: "CustomerName", contact: "0300-3030300", totalAmount: 789, paidAmount: 1000, due: 211, profit: 289 },
  { name: "ItemName", date: "12-12-2012", customerName: "CustomerName", contact: "0300-3030300", totalAmount: 789, paidAmount: 1000, due: 211, profit: 289 },
  { name: "ItemName", date: "12-12-2012", customerName: "CustomerName", contact: "0300-3030300", totalAmount: 789, paidAmount: 1000, due: 211, profit: 289 },
];

 function SalesRecord() {
  return (
    <div className="flex min-h-screen text-black">
      <main className="flex-1 bg-gray-50 p-6">
        {/* Search & Buttons */}
        <div className="justify-between items-center mb-4">
          <SearchBar />         
        </div>

        {/* Table */}
        <div className="overflow-auto rounded shadow-sm">
          <h2 className="text-black pb-5 font-bold">Sales Record</h2>
          <table className="min-w-full text-sm border border-gray-300 bg-white">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2 border">Product Name</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Customer Name</th>
                <th className="p-2 border">Contact</th>
                <th className="p-2 border">Total Amount</th>
                <th className="p-2 border">Paid Amount</th>
                <th className="p-2 border">Due Amount</th>
                <th className="p-2 border">Profit</th>
                <th className="p-2 border">View Reciept</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-2 border">{item.name}</td>
                  <td className="p-2 border">{item.date}</td>
                  <td className="p-2 border">{item.customerName}</td>
                  <td className="p-2 border">{item.contact}</td>
                  <td className="p-2 border">{item.totalAmount.toFixed(2)}</td>
                  <td className="p-2 border">{item.paidAmount.toFixed(2)}</td>
                  <td className="p-2 border">{item.due.toFixed(2)}</td>
                  <td className="p-2 border">{item.profit}</td>

                  <td className="p-2 border justify-center items-center ">
                    <img className="h-6 w-6" src="https://tse1.mm.bing.net/th/id/OIP.gNmby9tjHxodyMl2QFpR7gAAAA?pid=Api" alt="" />                    
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