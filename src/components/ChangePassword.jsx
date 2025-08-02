import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig"; // your configured Axios instance
import { useUser } from "../context/UserContext";
import Loading from "./Loading";
import { useToast } from "../context/ToastContext";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, loadingUser } = useUser();
  const {showToast} = useToast();
  
  const navigate = useNavigate();
  
  if (loadingUser) {
    return <Loading />;
  }
  const email = user.email;
  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match", "warning")
      return;
    }

    try {
      setLoading(true);

      const response = await axios.put("/users/change-password", {
        email,
        oldPassword,
        newPassword,
      });

      showToast("Password changed successfully", "success")
      navigate("/"); 
      localStorage.clear();
    } catch (error) {
      console.error("Error changing password", error);
      showToast(error?.response?.data?.message ||
      "Failed to change password. Please try again.","danger")
    } finally {
      setLoading(false);
    }
  };

  const goToProfile = () => {
    navigate("/admin-profile");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#749BC2] text-black">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Change Password
          </h2>
          <button
            onClick={goToProfile}
            className="!bg-white !text-[#749BC2] !border-2 border-[#749BC2] w-12 h-12 !flex !items-center !justify-center !rounded-full transition-all duration-200 ease-in-out
              hover:!text-black hover:!border-black active:!text-black active:!border-black focus:!outline-none !leading-none !p-0"
          >
            <span className="text-[38px]" style={{ transform: "translateY(-3px)" }}>
              &times;
            </span>
          </button>
        </div>

        <form onSubmit={handleReset}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none cursor-auto bg-gray-100"
              value={user.email || ""}
              readOnly
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Enter Old Password</label>
            <input
              type="password"
              placeholder="Old password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              placeholder="New password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
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
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition mb-3"
            style={{ background: "#749BC2" }}
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
