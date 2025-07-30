import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
const inventoryData = [
  { name: "ItemName", original: 123, resale: 321, sold: 0, earnings: 0, stock: 678, profit: 0 },
  { name: "ItemName", original: 123, resale: 321, sold: 0, earnings: 0, stock: 678, profit: 0 },
  { name: "ItemName", original: 123, resale: 321, sold: 0, earnings: 0, stock: 678, profit: 0 },
  { name: "ItemName", original: 123, resale: 321, sold: 0, earnings: 0, stock: 678, profit: 0 },
  { name: "ItemName", original: 123, resale: 321, sold: 0, earnings: 0, stock: 678, profit: 0 },
];

export default function InventoryDashboard() {
  const navigate = useNavigate();
  const goToEditProduct = () => {
    navigate('/edit-product');
  }
  const goToAddProduct = () => {
    navigate('/add-product');
  }
  return (
    <div className="flex min-h-screen text-black">
      <main className="flex-1 bg-gray-50 p-6">
        {/* Search & Buttons */}
        <div className="justify-between items-center mb-4">
          <SearchBar />          
          <div className="flex gap-6">
            <button style={{background:'#91C8E4'}} className=" px-6 py-6 text-sm font-extrabold rounded text-white bg-[#91C8E4]">All Inventory</button>
            <button style={{background:'#91C8E4'}} className=" px-6 py-6 text-sm font-extrabold rounded text-white bg-[#91C8E4]" onClick={goToAddProduct}>Add Product</button>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-black mb-4">Inventory</h2>

        {/* Table */}
        <div className="overflow-auto rounded shadow-xl">
          <table className="min-w-full text-sm border border-gray-300 bg-white">
            <thead className="bg-gray-200 text-left">
              <tr>
                <th className="p-2 border">Product Name</th>
                <th className="p-2 border">Original Price</th>
                <th className="p-2 border">Resale Price</th>
                <th className="p-2 border">Sold Items</th>
                <th className="p-2 border">Earnings</th>
                <th className="p-2 border">In Stock</th>
                <th className="p-2 border">Profit</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody className="bg-gray-100">
              {inventoryData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-2 border">{item.name}</td>
                  <td className="p-2 border">{item.original.toFixed(2)}</td>
                  <td className="p-2 border">{item.resale.toFixed(2)}</td>
                  <td className="p-2 border">{item.sold}</td>
                  <td className="p-2 border">{item.earnings.toFixed(2)}</td>
                  <td className="p-2 border">{item.stock}</td>
                  <td className="p-2 border">{item.profit.toFixed(2)}</td>
                  <td className="p-2 border space-x-2 flex justify-center items-center ">
                    <button style={{background:'#91C8E4'}} className=" px-6 py-6 text-sm font-extrabold rounded text-white bg-[#91C8E4]"
                    onClick={goToEditProduct}
                    >
                      Edit Product
                    </button>
                    <button style={{background:'#91C8E4'}} className=" px-6 py-6 text-sm font-extrabold rounded text-white bg-[#91C8E4]">
                      Delete Product
                    </button>
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
