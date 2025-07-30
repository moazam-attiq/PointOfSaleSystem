import React from "react";
import { useNavigate } from "react-router-dom";

export default function EditProductForm() {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/Dashboard");
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#749BC2]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Edit Product</h2>
          <button
            onClick={goToHome}
            className="!bg-white !text-[#749BC2] border-2 border-[#749BC2] w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 ease-in-out
             hover:!text-black hover:!border-black active:!text-black active:!border-black focus:outline-none leading-none p-0"
          >
            <span
              className="text-[30px] leading-none flex items-center justify-center"
              style={{ transform: "translateY(-1px)" }}
            >
              &times;
            </span>
          </button>
        </div>

        <form className="space-y-4 text-black">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Product Id:
            </label>
            <input
              type="text"
              defaultValue="1"
              className="w-full px-4 py-2 border border-black rounded-lg "
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Product Name:
            </label>
            <input
              type="text"
              defaultValue="Nut bolt"
              className="w-full px-4 py-2 border border-black rounded-lg "
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Original Price:
            </label>
            <input
              type="text"
              defaultValue="50.00"
              className="w-full px-4 py-2 border  border-black rounded-lg "
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Resale Price:
            </label>
            <input
              type="text"
              defaultValue="90.00"
              className="w-full px-4 py-2 border  border-black rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Add Quantity in Stock:
            </label>
            <input
              type="text"
              placeholder="Number of items to be added"
              className="w-full px-4 py-2 border  border-black rounded-lg "
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold text-white rounded-lg bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600"
            style={{ background: "#749BC2" }}
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}
