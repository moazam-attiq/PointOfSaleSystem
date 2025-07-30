import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig"; // make sure this exists

const Cart = ({ cart, setCart, clearCart }) => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.resalePrice * item.quantity,
    0
  );

  const increaseQty = (_id) => {
    setCart(
      cart.map((item) =>
        item._id === _id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (_id) => {
    setCart(
      cart
        .map((item) =>
          item._id === _id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (_id) => {
    setCart(cart.filter((item) => item._id !== _id));
  };

  const goToProceed = async () => {
    try {
      const res = await axios.post("/orders", {
        cartItems: cart,
        totalAmount: total,
      });
  
      // Store returned order ID (assuming your backend returns it as _id)
      localStorage.setItem("latestOrderId", res.data.orderId);
  
      clearCart();
      navigate("/payment");
    } catch (error) {
      alert("❌ Failed to place order: " + (error.response?.data?.message || error.message));
    }
  };
  

  return (
    <>
      {!visible && (
        <button
          style={{ background: "#4682A9" }}
          onClick={() => setVisible(true)}
          className="fixed bottom-4 right-4 text-white px-4 py-2 rounded shadow mb-2.5"
        >
          Show Cart
        </button>
      )}

      <div
        className={`p-4 bg-[#749BC2] border rounded-2xl shadow fixed bottom-4 right-4 w-[32%] max-h-[60vh] overflow-y-auto transition-transform duration-500 ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          style={{ background: "#4682A9" }}
          onClick={() => setVisible(false)}
          className="absolute top-2 right-2 text-white px-3 py-1 rounded-full shadow"
        >
          ❌
        </button>

        <h2 className="font-bold text-lg mb-3 mt-2">Cart Items</h2>

        {cart.length === 0 ? (
          <p className="text-white">Your cart is empty.</p>
        ) : (
          <ul className="space-y-3 mb-4">
            {cart.map((item) => (
              <li
                key={item._id}
                className="bg-[#91C8E4] text-white px-3 py-2 rounded-2xl flex gap-3 items-center"
              >
                <img
                  src={`http://localhost:5000${item.image}`} // Update if deployed
                  alt={item.productName}
                  className="w-12 h-12 rounded object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.productName}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="!bg-[#749BC2] text-white w-6 h-6 text-sm rounded-full flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="text-sm">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item._id)}
                      className="!bg-[#749BC2] text-white w-6 h-6 text-sm rounded-full flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p>Rs. {item.resalePrice * item.quantity}</p>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="!bg-[#749BC2] text-white w-6 h-6 text-xs rounded-full flex items-center justify-center mt-2"
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <p className="font-semibold text-white mb-4">Total: Rs. {total}</p>

        <div className="flex gap-2">
          <button
            style={{ background: "#91C8E4" }}
            onClick={clearCart}
            className="text-white px-4 py-2 rounded w-1/2"
          >
            Clear Cart
          </button>
          <button
            style={{ background: "#91C8E4" }}
            onClick={goToProceed}
            className="text-white px-4 py-2 rounded w-1/2"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
