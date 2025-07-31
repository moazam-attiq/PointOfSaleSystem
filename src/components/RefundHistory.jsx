import React from "react";
import SearchBar from "./SearchBar";

const refundData = [
  { name: "Nut bolt", original: 50, resale: 90, sold: 0, earnings: 0, stock: 681, profit: 0 ,refunddate :'30-06-2025'  },
  { name: "pipe", original: 30, resale: 80, sold: 0, earnings: 0, stock: 356, profit: 0 , refunddate :'30-06-2025' },
  { name: "T kak", original: 89, resale: 200, sold: 0, earnings: 0, stock: 7989, profit: 0,refunddate :'30-06-2025'  },
  { name: "samad", original: 50, resale: 80, sold: 0, earnings: 0, stock: 7656, profit: 0 ,refunddate :'30-06-2025' },
  { name: "motor", original: 600, resale: 800, sold: 0, earnings: 0, stock: 67, profit: 0 ,refunddate :'30-06-2025' },
];

 function RefundHistory() {
  return (
    <div className="flex min-h-screen text-black">
      <main className="flex-1 bg-gray-50 p-6">
        {/* Search & Buttons */}
        <div className="justify-between items-center mb-4">
          <SearchBar searchText="Search the Customer..."/>
        </div>

        {/* Table */}
        <div className="overflow-auto rounded shadow-sm">
          <h2 className="text-black pb-5 font-bold">Refund History</h2>
          <table className="min-w-full text-sm border border-gray-300 bg-white">
            <thead className="bg-gray-100 text-left">
              <tr>
              <th className="p-2 border">#</th>
                <th className="p-2 border">Customer Name</th>
                <th className="p-2 border">Mobile</th>
                <th className="p-2 border">Product Name</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Refunded Amount</th>
                <th className="p-2 border">Refund Date</th>
                <th className="p-2 border">View Reciept</th>
              </tr>
            </thead>
            <tbody>
              {refundData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-2 border">{item.name}</td>
                  <td className="p-2 border">{item.original.toFixed(2)}</td>
                  <td className="p-2 border">{item.resale.toFixed(2)}</td>
                  <td className="p-2 border">{item.sold}</td>
                  <td className="p-2 border">{item.earnings.toFixed(2)}</td>
                  <td className="p-2 border">{item.stock}</td>
                  <td className="p-2 border">{item.refunddate}</td>
                  <td className="p-2 border  space-x-2 flex justify-center items-center ">
                    <img className="h-6 w-6 cursor-pointer" src="https://tse1.mm.bing.net/th/id/OIP.gNmby9tjHxodyMl2QFpR7gAAAA?pid=Api" alt="" />                    
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

export default RefundHistory;