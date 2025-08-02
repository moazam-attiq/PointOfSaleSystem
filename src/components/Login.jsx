import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const gotoDashboard = () => {
    navigate("/dashboard");
  };
  const goToForget = () => {
    navigate("/forget-Password");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#749BC2] text-black">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none  outline-none"
            />
          </div>
          <button
            style={{ background: "#749BC2" }}
            type="submit"
            className="w-full text-white font-bold"
            onClick={gotoDashboard}
          >
            Login
          </button>
          <p
            onClick={goToForget}
            className="cursor-pointer mt-2.5 text-center text-sm text-blue-600 hover:underline"
            >
            <b> Forgot your Password? </b>
          </p>
        </form>
      </div>
    </div>
  );
}
