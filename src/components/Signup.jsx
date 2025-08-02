import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/admin-profile");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Placeholder for backend logic
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    navigate("/login"); // Redirect to login after signup
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#749BC2] text-black">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Sign Up
          </h2>
          <button
            onClick={goToProfile}
            className="!bg-white !text-[#749BC2] !border-2 border-[#749BC2] w-12 h-12 !flex !items-center !justify-center !rounded-full transition-all duration-200 ease-in-out
          hover:!text-black hover:!border-black active:!text-black active:!border-black focus:!outline-none !leading-none !p-0"
          >
            <span
              className="text-[38px]"
              style={{ transform: "translateY(-3px)" }}
            >
              &times;
            </span>
          </button>
        </div>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none outline-none"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none outline-none"
            />
          </div>
          <button
            style={{ background: "#749BC2" }}
            type="submit"
            className="w-full text-white font-bold py-2 rounded-md"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
