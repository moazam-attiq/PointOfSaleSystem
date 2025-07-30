import React from "react";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

const products = [
  {
    name: "ItemName",
    price: 123,
    image:
      "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
  },
  {
    name: "ItemName",
    price: 123,
    image:
      "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
  },
  {
    name: "ItemName",
    price: 123,
    image:
      "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
  },
  {
    name: "ItemName",
    price: 123,
    image:
      "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
  },
  {
    name: "ItemName",
    price: 123,
    image:
      "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
  },
];
export default function Alerts() {
  const navigate = useNavigate();
  const restock = (product) => {
    console.log("Restocking:", product);
    navigate("/edit-product");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          product={product}
          buttonText="Restock"
          onButtonClick={() => restock(product)}
        />
      ))}
    </div>
  );
}
