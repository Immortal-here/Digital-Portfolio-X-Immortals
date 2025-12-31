// src/components/Logout.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await signOut(auth);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");

        toast.success("👋 Logged out successfully!", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
        });

        setTimeout(() => {
          navigate("/login");
        }, 1200);
      } catch (err) {
        console.error("❌ Logout error:", err);
        toast.error("⚠️ Failed to log out. Try again.", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      }
    };

    doLogout();
  }, [navigate]);

  return null; // No UI, just action
};

export default Logout;
