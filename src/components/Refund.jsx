  import React, { useState, useEffect } from "react";
  import axios from "../api/axiosConfig"; // Your configured Axios instance
  import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

  export default function Refund() {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedOrderId, setSelectedOrderId] = useState("");
    const {showToast} = useToast();
    const [refundedCartItems, setRefundedCartItems] = useState([]);

    // Fetch suggestions based on searchTerm
    useEffect(() => {
      const fetchSuggestions = async () => {
        if (typeof searchTerm !== "string" || searchTerm.trim().length < 2)
          return;

        try {
          const res = await axios.get(
            `/refunds/search-customer?customerName=${searchTerm}`
          );
          setSuggestions(res.data);
        } catch (err) {
          console.error("Error fetching suggestions:", err);
        }
      };

      fetchSuggestions();
    }, [searchTerm]);

    // Fetch full order when selected
    const handleSelect = async (orderId) => {
      try {
        const res = await axios.get(`/refunds/payment/${orderId}`);

        setSelectedOrder(res.data);
        setRefundedCartItems(
          res.data.cartItems.map((item) => ({
            ...item,
            refundQuantity: item.quantity, // Default to full refund
            refundTotal: item.resalePrice * item.quantity,
          }))
        );
        setSelectedOrderId(orderId);
        setSuggestions([]);
        setSearchTerm(res.data.customerName ?? searchTerm);
      } catch (err) {
        if (err.response && err.response.status === 409) {
          showToast("This order has already been refunded", "info")
        } else {
          console.error("Error fetching order data:", err);
          showToast("Failed to fetch order data", "danger")
        }
      }
    };

    const handleSubmit = async () => {
      try {
        if (refundedCartItems.length === 0) {
          showToast("Please select at least one item to refund", "warning");
          return;
        }
    
        const totalRefundAmount = refundedCartItems.reduce(
          (sum, item) => sum + item.refundTotal,
          0
        );
    
        const refundPayload = {
          orderId: selectedOrderId,
          refundedItems: refundedCartItems.map((item) => ({
            productId: item.productId,
            quantity: item.refundQuantity,
          })),
          totalRefundAmount: parseFloat(totalRefundAmount.toFixed(2)),
        };

        await axios.post("/refunds", refundPayload);
        showToast("Refund recorded successfully", "succcess");
    
        // Reset form
        setSearchTerm("");
        setSuggestions([]);
        setSelectedOrder(null);
        setSelectedOrderId("");
        setRefundedCartItems([]);
    
        navigate("/dashboard"); // Optional
      } catch (error) {
        console.error("Refund submission failed", error);
        showToast("Something went wrong during refund", "danger");
      }
    };
    

    return (
      <div className="w-full mx-auto p-6 bg-white min-h-screen">
        <h2 className="py-6 font-bold text-black">Refund</h2>

        {/* Customer Name Autocomplete */}
        <div className="mb-4 relative">
          <label className="block font-semibold mb-1">Customer Name</label>
          <input
            type="text"
            placeholder="Start typing name..."
            value={searchTerm || ""}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-3/4 border rounded px-3 py-2"
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border rounded mt-1 w-3/4 max-h-40 overflow-y-auto shadow">
              {suggestions.map((s, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSelect(s.orderId)}
                  className="p-2 cursor-pointer hover:bg-blue-100 transition duration-200"
                >
                  <span className="font-semibold">{s.customerName}</span>
                  <span className="text-gray-500 ml-2 text-sm">
                    (Order #{s.orderNumber?.toString().slice(-14)})
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Mobile Number (if needed) */}
        <div className="mb-6">
          <label className="block font-semibold mb-1">Mobile Number</label>
          <input
            type="text"
            value={selectedOrder?.mobileNumber || ""}
            readOnly
            className="w-3/4 border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        {/* Products in Order (Read-only) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {refundedCartItems.map((p, i) => (
            <div key={i} className="bg-gray-50 border rounded-lg p-4 shadow-sm">
              <div className="flex justify-end">
                <button 
                  style={{background: '#91C8E4'}}
                  className="text-red-500 hover:underline !text-sm"
                  onClick={() => {
                    const updated = refundedCartItems.filter((_, index) => index !== i);
                    setRefundedCartItems(updated);
                  }}
                >
                  Remove
                </button>
              </div>
              <div className="mb-3">
                <label className="block font-semibold mb-1">Product Name</label>
                <input
                  value={p.productName}
                  readOnly
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                />
              </div>

              <div className="mb-3">
                <label className="block font-semibold mb-1">
                  Quantity (max {p.quantity})
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const updated = [...refundedCartItems];
                      if (updated[i].refundQuantity > 1) {
                        updated[i].refundQuantity -= 1;
                        updated[i].refundTotal =
                          updated[i].refundQuantity * p.resalePrice;
                        setRefundedCartItems(updated);
                      }
                    }}
                    style={{ background: "#91C8E4" }}
                    className="px-6 py-6 !text-sm !font-extrabold rounded text-white"
                  >
                    −
                  </button>

                  <span className="w-8 text-center">{p.refundQuantity}</span>

                  <button
                    onClick={() => {
                      const updated = [...refundedCartItems];
                      if (updated[i].refundQuantity < p.quantity) {
                        updated[i].refundQuantity += 1;
                        updated[i].refundTotal =
                          updated[i].refundQuantity * p.resalePrice;
                        setRefundedCartItems(updated);
                      }
                    }}
                    style={{ background: "#91C8E4" }}
                    className="px-6 py-6 !text-sm !font-extrabold rounded text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <label className="block font-semibold mb-1">Refund Total</label>
                <input
                  type="number"
                  readOnly
                  value={p.refundTotal.toFixed(2)}
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Submit */}
        {selectedOrder && (
          <div className="w-3/4 flex justify-end mt-6">
            <button
              onClick={handleSubmit}
              style={{ background: "#91C8E4" }}
              className="px-6 py-6 text-sm font-extrabold rounded text-white"
            >
              Submit Refund
            </button>
          </div>
        )}
      </div>
    );
  }
