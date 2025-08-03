import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";
import { useToast } from "../context/ToastContext"; // <-- toast hook

export default function AddProductForm() {
  const navigate = useNavigate();
  const { showToast } = useToast(); // <-- use toast context

  const [form, setForm] = useState({
    productName: "",
    originalPrice: "",
    resalePrice: "",
    stockQuantity: "",
    productImage: null
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { productName, originalPrice, resalePrice, stockQuantity, productImage } = form;

    if (!productName || !originalPrice || !resalePrice || !stockQuantity || !productImage) {
      showToast("Please fill all fields and upload an image.", "warning");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("productImage", productImage);
      formData.append("productName", productName);
      formData.append("originalPrice", originalPrice);
      formData.append("resalePrice", resalePrice);  
      formData.append("stockQuantity", stockQuantity);

      await axios.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showToast("Product added successfully!", "success");

      setForm({
        productName: "",
        originalPrice: "",
        resalePrice: "",
        stockQuantity: "",
        productImage: null,
      });

      goToHome();
    } catch (error) {
      showToast(
        "Failed to add product: " + (error.response?.data?.message || error.message),
        "danger"
      );
    }
  };

  const goToHome = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#749BC2]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Add New Product</h2>
          <button
            onClick={goToHome}
            className="!bg-white !text-[#749BC2] !border-2 border-[#749BC2] w-12 h-12 flex items-center justify-center !rounded-full transition-all duration-200 ease-in-out
              hover:!text-black hover:!border-black active:!text-black active:!border-black focus:outline-none leading-none p-0"
          >
            <span className="text-[38px]" style={{ transform: "translateY(-3px)" }}>
              &times;
            </span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Product Image
            </label>
            <input
              name="productImage"
              type="file"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-black rounded-lg bg-white file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-lg file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Product Name
            </label>
            <input
              name="productName"
              type="text"
              value={form.productName}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full px-4 py-2 border border-black rounded-lg placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Original Price
            </label>
            <input
              name="originalPrice"
              type="number"
              value={form.originalPrice}
              onChange={handleChange}
              placeholder="Enter original price"
              className="w-full px-4 py-2 border border-black rounded-lg placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Resale Price
            </label>
            <input
              name="resalePrice"
              type="number"
              value={form.resalePrice}
              onChange={handleChange}
              placeholder="Enter resale price"
              className="w-full px-4 py-2 border border-black rounded-lg placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Quantity
            </label>
            <input
              name="stockQuantity"
              type="number"
              value={form.stockQuantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              className="w-full px-4 py-2 border border-black rounded-lg placeholder-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold text-white rounded-lg bg-gradient-to-r from-pink-500 to-yellow-400 hover:from-pink-600 hover:to-yellow-500"
            style={{ background: "#749BC2" }}
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
