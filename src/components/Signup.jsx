// src/components/Signup.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Forms.scss";

import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  if (authLoading) {
    return (
      <div className="auth-fullscreen-loader">
        <div className="loader-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("⚠️ Passwords do not match", { theme: "colored" });
      return;
    }

    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        formData.email.trim().toLowerCase(),
        formData.password
      );
      await updateProfile(cred.user, { displayName: formData.username });
      toast.success("🎉 Account created successfully!", {
        theme: "colored",
      });
    } catch (err) {
      console.error("❌ Signup error:", err);
      toast.error("⚠️ Signup failed", { theme: "colored" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      toast.success(`🎉 Welcome, ${res.user.displayName}!`, {
        theme: "colored",
      });
    } catch (err) {
      console.error("❌ Google signup error:", err);
      toast.error("⚠️ Google signup failed", { theme: "colored" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <header className="auth-header">
        <Link to="/" className="auth-logo">
          <span className="auth-logo-icon">
            <i className="fas fa-code" />
          </span>
          <span className="auth-logo-text">DigiPratibha</span>
        </Link>
      </header>

      <div className="auth-layout">
        <div className="auth-card auth-card--signup">
          <div className="auth-card-header">
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">
              Start building your professional portfolio in minutes
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label" htmlFor="signup-username">
                Username
              </label>
              <input
                id="signup-username"
                type="text"
                name="username"
                className="form-input"
                placeholder="Your name"
                value={formData.username}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="signup-email">
                Email
              </label>
              <input
                id="signup-email"
                type="email"
                name="email"
                className="form-input"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="signup-password">
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                name="password"
                className="form-input"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>

            <div className="form-group">
              <label
                className="form-label"
                htmlFor="signup-confirm-password"
              >
                Confirm Password
              </label>
              <input
                id="signup-confirm-password"
                type="password"
                name="confirmPassword"
                className="form-input"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>

            <button
              type="submit"
              className="auth-btn auth-btn--primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="btn-spinner" />
                  Creating account...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <button
            type="button"
            className="auth-btn auth-btn--google"
            onClick={handleGoogleSignup}
            disabled={loading}
          >
            <span className="google-icon">
              <i className="fab fa-google" />
            </span>
            <span>Sign up with Google</span>
          </button>

          <p className="auth-footer-text">
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Signup;
