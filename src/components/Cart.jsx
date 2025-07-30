import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart, clearCart }) => {
  const [visible, setVisible] = useState(true); 
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const navigate = useNavigate();
  
  function goToProceed() {
    navigate('/payment');
  }
  return (
    <>
      {!visible && (
        <button
          style={{background:'#4682A9'}} 
          onClick={() => setVisible(true)}
          className="fixed bottom-4 right-4  text-white px-4 py-2 rounded shadow mb-2.5"
        >
          Show Cart
        </button>
      )}

      <div
        className={`p-4 bg-[#749BC2] border rounded-2xl shadow fixed bottom-4 right-4 w-[32%] h-43 transition-transform duration-500 ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
      <button
          style={{background:'#4682A9'}} 
          onClick={() => setVisible(false)}
          className="fixed bottom-4 right-4  text-white px-4 py-2 rounded shadow"
        >
          Close
        </button>

        <h2 className="font-bold text-lg mb-2 mt-4">Cart</h2>
        <p>Total: Rs. {total}</p>

        <div className="flex gap-2 mt-4">
          <button
            style={{background:'#91C8E4'}} 
            onClick={clearCart}
            className="bg-[#91C8E4] text-white px-4 py-2 rounded"
          >
            Clear Cart
          </button>
          <button style={{background:'#91C8E4'}} className="bg-[#91C8E4] text-white px-4 py-2 rounded"
          onClick={goToProceed}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
