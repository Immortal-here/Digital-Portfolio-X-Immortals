// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Subscribe to Firebase Auth state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Logout handler
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    // 👇 Important: delay rendering until we know auth state
    <AuthContext.Provider value={{ user, loading, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// ✅ Hook for easy access
export const useAuth = () => useContext(AuthContext);
