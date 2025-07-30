import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart, setCart, clearCart }) => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  function goToProceed() {
    navigate("/payment");
  }

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
                key={item.id}
                className="bg-[#91C8E4] text-white px-3 py-2 rounded-2xl flex gap-3 items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="!bg-[#749BC2] text-white w-6 h-6 text-sm rounded-full flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="text-sm">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="!bg-[#749BC2] text-white w-6 h-6 text-sm rounded-full flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p>Rs. {item.price * item.quantity}</p>
                  <button
                    onClick={() => removeItem(item.id)}
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
