import React, { useState, useEffect } from "react";
import axios from "./api/axiosConfig";

import InventoryDashboard from "./components/InventoryDashboard";
import RefundHistory from "./components/RefundHistory";
import SalesRecord from "./components/SalesRecord";
import Alerts from "./components/Alerts";
import Refund from "./components/Refund";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import Cart from "./components/Cart";

// Menu items with string keys
const menuItems = [
  { label: "Products", key: "products" },
  { label: "Inventory", key: "inventory" },
  { label: "Alerts", key: "alerts" },
  { label: "Sales", key: "sales" },
  { label: "Process Refund", key: "refund" },
  { label: "Refund History", key: "refundHistory" },
];

// Dummy product data
// const products = [
//   {
//     id: 1,
//     name: "ItemName",
//     price: 123,
//     image:
//       "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
//   },
//   {
//     id: 2,
//     name: "ItemName",
//     price: 123,
//     image:
//       "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
//   },
//   {
//     id: 3,
//     name: "ItemName",
//     price: 123,
//     image:
//       "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
//   },
//   {
//     id: 4,
//     name: "ItemName",
//     price: 123,
//     image:
//       "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
//   },
//   {
//     id: 5,
//     name: "ItemName",
//     price: 123,
//     image:
//       "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
//   },
//   {
//     id: 6,
//     name: "ItemName",
//     price: 123,
//     image:
//       "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
//   },
//   {
//     id: 7,
//     name: "ItemName",
//     price: 123,
//     image:
//       "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
//   },
//   {
//     id: 8,
//     name: "ItemName",
//     price: 123,
//     image:
//       "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
//   },
// ];

export default function Dashboard() {
  // Load selected tab from localStorage or default to "products"
  const [selected, setSelected] = useState(() => {
    return localStorage.getItem("selectedTab") || "products";
  });

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);

  // Save selected tab to localStorage
  useEffect(() => {
    localStorage.setItem("selectedTab", selected);
  }, [selected]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products"); // GET /api/products
        setProducts(res.data); // response contains array of products
      } catch (err) {
        console.error("❌ Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const filteredProducts = products.filter((item) =>
    item.productName.toLowerCase().includes(searchTerm)
  );

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product._id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const clearCart = () => setCart([]);

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      <div className="flex flex-1">
        <div className="sticky top-15 h-[calc(100vh-4rem)]">
          <Sidebar
            selected={selected}
            setSelected={setSelected}
            menuItems={menuItems}
          />
        </div>

        <div className="flex-1 justify-between flex-wrap p-4 text-black bg-white">
          {selected === "products" && (
            <>
              <SearchBar onSearch={handleSearch}/>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={index}
                    product={product}
                    buttonText="Add to Cart"
                    onButtonClick={addToCart}
                  />
                ))}
              </div>
            </>
          )}

          {selected === "inventory" && <InventoryDashboard />}
          {selected === "alerts" && <Alerts />}
          {selected === "sales" && <SalesRecord />}
          {selected === "refund" && <Refund />}
          {selected === "refundHistory" && <RefundHistory />}
        </div>

        {selected === "products" && (
          <Cart cart={cart} setCart={setCart} clearCart={clearCart} />
        )}
      </div>
    </div>
  );
}
