import React from "react";

export default function ProductCard({ product, buttonText, onButtonClick }) {
  return (
    <div className="border min-w-80 h-[320px] border-gray-100 rounded-3xl shadow-xl text-center bg-gray-100 text-black">
      <div className="w-full h-[50%] items-center justify-center p-2.5">
        <img className="w-full h-full rounded-2xl" src={product.image} alt="" />
      </div>
      <div className="my-3">
        <div className="text-lg font-semibold mb-2">{product.name}</div>
        <div className="text-green-600 font-bold">Rs {product.price}.00</div>
        <button
          style={{ background: "#91C8E4", outline: "none" }}
          className="mt-4 py-2 px-10 text-white rounded-full"
          onClick={() => onButtonClick(product)}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
