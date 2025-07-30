import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const OrderPayment = () => {
  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [amountReceived, setAmountReceived] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/receipt');
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-[#749BC2]">
          <div className="w-[50%] text-black bg-white rounded-xl shadow-lg p-6 ">
      <h2 className="text-xl font-semibold mb-4">Order Payment</h2>
      <div className="flex items-center justify-between mb-4">
        <p>
          <strong>Subtotal:</strong>{" "}
          <span className="text-red-500">Rs. 265.00</span>
        </p>
        <div className="flex items-center gap-2">
          <img src="https://static.vecteezy.com/system/resources/previews/014/007/798/original/cash-icon-design-illustration-template-vector.jpg" alt="Cash" className="w-6 h-6" />
          <span className="text-sm font-medium">Cash</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Customer Name
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter customer name"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none "
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Mobile Number
          </label>
          <input
            type="tel"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Enter mobile number"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none "
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Amount Received
          </label>
          <input
            type="number"
            value={amountReceived}
            onChange={(e) => setAmountReceived(e.target.value)}
            placeholder="Enter amount paid by customer"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none "
            required
          />
        </div>

        <button
          type="submit"
          className="w-full text-white font-semibold py-2 rounded transition"
          style={{background:'#91C8E4'}}
        >
          Proceed to Payment
        </button>
      </form>
    </div>
    </div>
  );
};

export default OrderPayment;
