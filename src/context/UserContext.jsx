import React, { createContext, useEffect, useState, useContext, useCallback } from "react";
import axios from "../api/axiosConfig";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      setUser(null);
      setLoadingUser(false);
      return;
    }

    try {
      setLoadingUser(true);
      const res = await axios.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user", err);
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  }, []);

  // Refetch when token changes
  useEffect(() => {
    const handleStorageChange = () => {
      fetchUser();
    };

    fetchUser(); // Initial load
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, [fetchUser]);

  return (
    <UserContext.Provider value={{ user, loadingUser, refetchUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
