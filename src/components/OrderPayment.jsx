import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";

const OrderPayment = () => {
  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [amountReceived, setAmountReceived] = useState("");
  const [billAmount, setBillAmount] = useState(0); // From order
  const navigate = useNavigate();

  const orderId = localStorage.getItem("latestOrderId");

  // Fetch order total using orderId
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!orderId) return;

        const res = await axios.get(`/orders/${orderId}`);
        setBillAmount(res.data.totalAmount);
      } catch (err) {
        alert("❌ Failed to fetch order details.");
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!orderId) {
      alert("❌ Order ID missing. Cannot proceed with payment.");
      return;
    }

    const received = parseFloat(amountReceived);
    const change = received - billAmount;

    if (received < billAmount) {
      alert("⚠️ Amount received is less than bill total.");
      return;
    }

    try {
      const paymentData = {
        orderId,
        customerName,
        mobileNumber,
        billAmount,
        amountReceived: received,
        changeGiven: change,
      };

      await axios.post("/payments", paymentData);
      alert("✅ Payment successful!");
      navigate("/receipt");
    } catch (err) {
      alert("❌ Failed to record payment: " + (err.response?.data?.message || err.message));
    }
  };

  const goToHome = () => {
    navigate("/Dashboard");
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-[#749BC2]">
      <div className="w-[45%] text-black bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between mb-4 items-center">
          <h2 className="text-xl font-semibold mb-4">Order Payment</h2>
          <button
            onClick={goToHome}
            className="!bg-white !text-[#749BC2] border-2 border-[#749BC2] w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 ease-in-out hover:!text-black hover:!border-black active:!text-black active:!border-black focus:outline-none leading-none p-0"
          >
            <span className="text-[30px] leading-none" style={{ transform: "translateY(-1px)" }}>
              &times;
            </span>
          </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p>
            <strong>Subtotal:</strong>{" "}
            <span className="text-red-500">Rs. {billAmount.toFixed(2)}</span>
          </p>
          <div className="flex items-center gap-2">
            <img
              src="https://static.vecteezy.com/system/resources/previews/014/007/798/original/cash-icon-design-illustration-template-vector.jpg"
              alt="Cash"
              className="w-6 h-6"
            />
            <span className="text-sm font-medium">Cash</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Customer Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mobile Number</label>
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Enter mobile number"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Amount Received</label>
            <input
              type="number"
              value={amountReceived}
              onChange={(e) => setAmountReceived(e.target.value)}
              placeholder="Enter amount paid by customer"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white font-semibold py-2 rounded transition"
            style={{ background: "#91C8E4" }}
          >
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderPayment;
