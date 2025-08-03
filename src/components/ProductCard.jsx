import React from "react";

export default function ProductCard({ product, buttonText, onButtonClick }) {
  return (
    <div className="w-full bg-gray-100 text-black rounded-3xl shadow-xl border border-gray-200 flex flex-col justify-between">
      {/* Image Section */}

      <div className="w-full h-40 sm:h-48 md:h-52 lg:h-56 p-3 flex justify-center items-center">
        <img
          className="w-full h-full object-cover rounded-2xl"
          src={`http://localhost:5000${product.image}`}
          alt={product.productName || "Product Image"}
        />
      </div>

      {/* Text + Button Section */}
      <div className="px-4 pb-5 text-center flex flex-col gap-2">
        <div className="text-base sm:text-lg md:text-xl font-semibold mt-2">
          {product.productName}
        </div>
        <div className="text-green-600 font-bold text-sm sm:text-base md:text-lg">
          Rs {product.resalePrice}.00
        </div>
        <button
          className="mt-3 py-2 px-6 sm:px-10 text-white text-sm sm:text-base rounded-full transition duration-300 ease-in-out hover:bg-[#356486]"
          style={{ backgroundColor: "#4682A9", outline: "none" }}
          onClick={() => onButtonClick(product)}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
