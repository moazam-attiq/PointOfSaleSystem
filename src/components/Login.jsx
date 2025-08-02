import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";
import Loading from "../components/Loading"; // Adjust path if needed
import { useUser } from "../context/UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { refetchUser } = useUser();


  const goToForget = () => {
    navigate("/forget-Password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post("users/login", {
        email,
        password,
      });

      localStorage.setItem("userToken", data.token);

      const userRole = email === "admin@pos.com" ? "admin" : "employee";
      localStorage.setItem("userRole", userRole);

      navigate("/dashboard");
      await refetchUser(); // pull latest profile

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#749BC2] text-black">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center z-50">
          <Loading message="Logging in..." />
        </div>
      )}

      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-2xl relative z-10">
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
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
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
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
          </div>
          <button
            style={{ background: "#749BC2" }}
            type="submit"
            className="w-full text-white font-bold py-2 rounded"
          >
            Login
          </button>
          <p
            onClick={goToForget}
            className="cursor-pointer mt-2.5 text-center text-sm text-blue-600 hover:underline"
          >
            <b>Forgot your Password?</b>
          </p>
        </form>
      </div>
    </div>
  );
}
