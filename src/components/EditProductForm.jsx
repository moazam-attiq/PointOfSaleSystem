import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axiosConfig"; // Adjust path to your axios instance
import { useToast } from "../context/ToastContext";

export default function EditProductForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const {showToast} = useToast();
  const productId = new URLSearchParams(location.search).get("id");

  const [product, setProduct] = useState(null);
  const [addedStock, setAddedStock] = useState("");

  const goToHome = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/${productId}`);
        setProduct(res.data);
      } catch (err) {
        showToast("Failed to fetch product: " + err.message, "danger");
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product) return;
    if (!product.productName.trim()) {
      showToast("Product name cannot be empty", "warning");
      return;
    }

    if (addedStock < 0) {
      showToast("Failed to update product. Enter valid stock!", "warning");
      return;
    }
    const updatedProduct = {
      productName: product.productName,
      originalPrice: product.originalPrice,
      resalePrice: product.resalePrice,
      stock: parseInt(addedStock, 10),
    };

    try {
      await axios.put(`/products/${product._id}`, updatedProduct);
      showToast("Product updated successfully", "success")
      navigate("/dashboard");
    } catch (err) {
      showToast("Failed to update product: " + err.message, "danger")
    }
  };

  if (!product) {
    return (
      <p className="text-white text-center mt-10">⏳ Loading product data...</p>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#749BC2]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Edit Product</h2>
          <button
            onClick={goToHome}
            className="!bg-white !text-[#749BC2] !border-2 border-[#749BC2] w-12 h-12 flex items-center justify-center !rounded-full transition-all duration-200 ease-in-out
             hover:!text-black hover:!border-black active:!text-black active:!border-black focus:outline-none leading-none p-0"
          >
            <span
              className="text-[38px]"
              style={{ transform: "translateY(-3px)" }}
            >
              &times;
            </span>
          </button>
        </div>

        <form className="space-y-4 text-black" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Product Id:
            </label>
            <input
              type="text"
              value={product._id}
              disabled
              className="w-full px-4 py-2 border border-black rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Product Name:
            </label>
            <input
              type="text"
              value={product.productName}
              onChange={(e) =>
                setProduct({ ...product, productName: e.target.value })
              }
              className="w-full px-4 py-2 border border-black rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Original Price:
            </label>
            <input
              type="number"
              value={product.originalPrice}
              onChange={(e) =>
                setProduct({
                  ...product,
                  originalPrice: parseFloat(e.target.value),
                })
              }
              className="w-full px-4 py-2 border border-black rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Resale Price:
            </label>
            <input
              type="number"
              value={product.resalePrice}
              onChange={(e) =>
                setProduct({
                  ...product,
                  resalePrice: parseFloat(e.target.value),
                })
              }
              className="w-full px-4 py-2 border border-black rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Add Quantity in Stock:
            </label>
            <input
              type="number"
              value={addedStock}
              onChange={(e) => setAddedStock(e.target.value)}
              placeholder="Number of items to add"
              className="w-full px-4 py-2 border border-black rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold text-white rounded-lg"
            style={{ background: "#749BC2" }}
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}
