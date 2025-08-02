import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleReset = async (e) => {
    e.preventDefault();
  
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    try {
      const { data } = await axios.put("/users/reset-password", {
        email,
        newPassword
      });
  
      alert(data.message || "Password reset successfully");
      goToLogin();
    } catch (error) {
      console.error("Reset failed", error);
      alert(error?.response?.data?.message || "Something went wrong");
    }
  };

  const goToLogin = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#749BC2] text-black">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Forget Password
          </h2>
          <button
            onClick={goToLogin}
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
        <form onSubmit={handleReset}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none "
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition mb-3"
            style={{ background: "#749BC2" }}
          >
            Forget Password
          </button>
        </form>
      </div>
    </div>
  );
}
