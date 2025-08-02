import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // adjust path as needed
import Loading from "./Loading";

export default function AdminProfile() {
  const { user, loadingUser } = useUser();
  const [loggedInAdmin, setLoggedInAdmin] = useState(false);
  const navigate = useNavigate();
  

  const goToSignup = () => navigate("/signup");
  const handleChangePassword = () => navigate("/change-password");
  const goToHome = () => navigate("/dashboard");

  useEffect(() => {
    if (user?.role === "admin" || localStorage.getItem("userRole") === "admin") {
      setLoggedInAdmin(true);
    } else {
      setLoggedInAdmin(false);
    }
  }, [user]);

  // Show loader if data is being fetched
  if (loadingUser) {
    return <Loading />;
  }

  // Show fallback if no user found after loading
  if (!user) {
    return (
      <div className="text-center mt-10 text-white">
        User not found. Please log in again.
      </div>
    );
  }

  // Main JSX when user is loaded
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#749BC2] text-black">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Profile
          </h2>
          <button
            onClick={goToHome}
            className="!bg-white !text-[#749BC2] !border-2 border-[#749BC2] w-12 h-12 !flex !items-center !justify-center !rounded-full transition-all duration-200 ease-in-out hover:!text-black hover:!border-black active:!text-black active:!border-black focus:!outline-none !leading-none !p-0"
          >
            <span className="text-[38px]" style={{ transform: "translateY(-3px)" }}>
              &times;
            </span>
          </button>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={user.name || ""}
              readOnly
              className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-auto"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={user.email || ""}
              readOnly
              className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-auto"
            />
          </div>
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleChangePassword}
              className="w-full text-white py-2 rounded-md transition duration-300"
              style={{ background: "#749BC2" }}
            >
              Change your password
            </button>
            {loggedInAdmin && (
              <button
                type="button"
                onClick={goToSignup}
                className="w-full text-white py-2 rounded-md transition duration-300"
                style={{ background: "#749BC2" }}
              >
                Signup new Employee
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
