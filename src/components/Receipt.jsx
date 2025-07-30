import React from "react";
import { useNavigate } from "react-router-dom";

const Receipt = () => {
  const navigate = useNavigate();
  const goToDashboard = () => {
    navigate('/dashboard');
  }
  return (
   <div className="bg-[#749BC2] container w-full h-lvh flex justify-center items-center flex-col">
     <div className="bg-white text-black shadow-lg rounded-lg p-6 w-full max-w-md text-sm flex justify-center flex-col">
      <div className="text-center mb-4">
        <button
          onClick={goToDashboard}
          style={{background:'#4682A9'}} 
          className="w-auto mb-2 text-white px-4 py-2 rounded shadow"
        >
          Return to Dashboard
        </button>
        <img src="../../images/logo.jpg" alt="POS_Logo" className="h-12 mx-auto mb-2" />
        <h2 className="text-xl font-bold">SALES RECEIPT</h2>
      </div>

      <div className="mb-4">
        <p><strong>Invoice No:</strong> #4</p>
        <p><strong>Date:</strong> Sat Jun 28 2025 15:23:46</p>
        <p><strong>Cashier:</strong> User</p>
        <p><strong>Customer Name:</strong> Customer</p>
        <p><strong>Contact:</strong> 8547475</p>
      </div>

      <table className="w-full border border-gray-300 mb-4 text-left text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border border-gray-300">Item Name</th>
            <th className="p-2 border border-gray-300">Price</th>
            <th className="p-2 border border-gray-300">Qty</th>
            <th className="p-2 border border-gray-300">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border border-gray-300">PVC pipe</td>
            <td className="p-2 border border-gray-300">Rs. 120.00</td>
            <td className="p-2 border border-gray-300">1</td>
            <td className="p-2 border border-gray-300">Rs. 120.00</td>
          </tr>
          <tr>
            <td className="p-2 border border-gray-300">bulb</td>
            <td className="p-2 border border-gray-300">Rs. 145.00</td>
            <td className="p-2 border border-gray-300">1</td>
            <td className="p-2 border border-gray-300">Rs. 145.00</td>
          </tr>
        </tbody>
      </table>

      <div className="text-right mb-4 space-y-1">
        <p><strong>Sub Total:</strong> Rs. 265.00</p>
        <p><strong>Total Bill Amount:</strong> Rs. 265.00</p>
        <p><strong>Amount Received:</strong> Rs. 300.00</p>
        <p><strong>Change:</strong> Rs. 35.00</p>
      </div>

      <div className="text-center text-sm border-t pt-3">
        <p className="font-semibold">Point of Sale System</p>
        <p>📍 Point of Sale Chowk, GIFT University, Pakistan</p>
        <p>📞 Phone: 0300-3030300</p>
      </div>
    </div>
  
   </div>
)};

export default Receipt;
