import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";
import Loading from "./Loading";
import EmptyState from "./EmptyState";

export default function Alerts() {
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        const res = await axios.get("/products/inventory");
        const filtered = res.data
          .filter((product) => product.stock < 10)
          .sort((a, b) => a.stock - b.stock);
        setLowStockProducts(filtered);
      } catch (err) {
        console.error("❌ Failed to fetch low-stock products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLowStock();
  }, []);

  const restock = (product) => {
    navigate(`/edit-product?id=${product._id}&headerText=Restock%20Product`);
  };

  const getBadge = (stock) => {
    if (stock < 3)
      return (
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
          🔥 Critical Low
        </span>
      );
    else if (stock < 6)
      return (
        <span className="bg-orange-400 text-white text-xs px-2 py-1 rounded">
          ⚠️ Very Low
        </span>
      );
    else
      return (
        <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded">
          ⚠️ Low Stock
        </span>
      );
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-red-600">
        ⚠️ Low Stock Alerts
      </h2>

      {loading ? (
        <Loading message="Checking inventory levels..." />
      ) : lowStockProducts.length === 0 ? (
        <EmptyState message="✅ All products have sufficient stock." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {lowStockProducts.map((product, index) => (
            <div key={index} className="relative">
              <div className="absolute top-2 right-2 z-10">
                {getBadge(product.stock)}
              </div>
              <ProductCard
                product={{
                  productName: product.name,
                  resalePrice: product.resale,
                  image: product.image,
                  _id: product._id,
                }}
                buttonText="Restock"
                onButtonClick={() => restock(product)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
