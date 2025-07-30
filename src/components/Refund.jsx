import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Refund() {
  console.log("Refundddd");

  const [products, setProducts] = useState([
    { id: Date.now(), name: "", quantity: 1, amount: "" },
  ]);
  const navigate = useNavigate();

  const handleAddProduct = () => {
    setProducts([
      ...products,
      { id: Date.now(), name: "", quantity: 1, amount: "" },
    ]);
  };

  const handleRemoveProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleChange = (id, field, value) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, [field]: value } : product
      )
    );
  };

  const handleSubmit = () => {
    navigate('/dashboard')
  };

  return (
    <div className="w-full  mx-auto p-6 bg-white min-h-screen">

     <h2 className=" py-6 font-bold text-black">Refund</h2>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Customer Name</label>
        <input
          type="text"
          placeholder="Enter customer name"
          className="w-3/4 border rounded px-3 py-2"
        />
      </div>
      <div className="mb-6">
        <label className="block font-semibold mb-1">Mobile Number</label>
        <input
          type="text"
          placeholder="Enter mobile number"
          className="w-3/4 border rounded px-3 py-2"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div 
          key={product.id} 
          className="bg-gray-50 border rounded-lg p-4 shadow-sm"
          >

            <div className="mb-3 ">
              <label className="block font-semibold mb-1">Product Name</label>
              <input
                type="text"
                placeholder="Select Product"
                value={product.name}
                onChange={(e) =>
                  handleChange(product.id, "name", e.target.value)
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="mb-3">
              <label className="block font-semibold mb-1">Product Quantity</label>
              <input
                type="number"
                value={product.quantity}
                onChange={(e) =>
                  handleChange(product.id, "quantity", e.target.value)
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="mb-3">
              <label className="block font-semibold mb-1">Refunded Amount</label>
              <input
                type="text"
                placeholder="Amount to be Refunded"
                value={product.amount}
                onChange={(e) =>
                  handleChange(product.id, "amount", e.target.value)
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <button
              onClick={() => handleRemoveProduct(product.id)}
              style={{background:'#91C8E4'}} className=" px-6 py-6 text-sm font-extrabold rounded text-white bg-[#91C8E4]"
            >
              Remove Product
            </button>
          </div>
        ))}
      </div>

      <div className=" w-3/4 flex justify-between mt-6">
        <button
          onClick={handleAddProduct}
          style={{background:'#91C8E4'}} className=" px-6 py-6 text-sm font-extrabold rounded text-white bg-[#91C8E4]"
        >
          Add Another Product
        </button>
        <button
          onClick={handleSubmit}
         style={{background:'#91C8E4'}} className=" px-6 py-6 text-sm font-extrabold rounded text-white bg-[#91C8E4]"
        >
          Submit Refund
        </button>
      </div>
    </div>
  );
}
