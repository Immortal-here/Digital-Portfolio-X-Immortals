// src/components/Login.jsx
// Replaced axios-based backend login with Firebase Auth (email/password + Google)
// Make sure you have created src/firebase.js exporting `auth` and `googleProvider`.

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Forms.scss";

// Firebase imports
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    return true;
  };

  // Email / password login using Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const cleanedEmail = formData.email.trim().toLowerCase();
      const cred = await signInWithEmailAndPassword(
        auth,
        cleanedEmail,
        formData.password
      );

      const user = cred.user;
      const token = await user.getIdToken();
      const storage = rememberMe ? localStorage : sessionStorage;

      const userData = {
        id: user.uid,
        name: user.displayName || cleanedEmail.split("@")[0],
        email: user.email,
      };

      storage.setItem("token", token);
      storage.setItem("user", JSON.stringify(userData));

      // reset form
      setFormData({ email: "", password: "" });
      setRememberMe(false);

      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Login error:", err);

      // Friendly messages for common Firebase Auth errors
      const code = err?.code || "";
      if (code === "auth/user-not-found") {
        setError("No account found with this email. Please sign up first.");
      } else if (code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else if (code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (code === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later.");
      } else if (code === "auth/network-request-failed") {
        setError("Network error. Please check your connection.");
      } else {
        setError(err?.message || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const token = await user.getIdToken();
      const storage = rememberMe ? localStorage : sessionStorage;

      const userData = {
        id: user.uid,
        name: user.displayName,
        email: user.email,
      };

      storage.setItem("token", token);
      storage.setItem("user", JSON.stringify(userData));

      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Google login error:", err);
      setError(err?.message || "Google login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      <header className="auth-header">
        <Link to="/" className="auth-logo">
          <i className="fas fa-code"></i>
          DigiPratibha
        </Link>
      </header>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-card-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && (
              <div className="alert alert-error">
                <i className="fas fa-exclamation-circle"></i>
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <i className="fas fa-envelope input-icon"></i>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <i className="fas fa-lock input-icon"></i>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  disabled={loading}
                  minLength={6}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-wrapper">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
                <span className="checkmark"></span>
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className={`auth-btn primary ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Signing in...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt"></i>
                  Sign In
                </>
              )}
            </button>

            <div className="divider">
              <span>or</span>
            </div>

            <button
              type="button"
              className="auth-btn secondary"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <i className="fab fa-google"></i>
              Continue with Google
            </button>

            <div className="auth-footer">
              <p>
                Don't have an account?
                <Link to="/signup" className="auth-link">
                  Create one here
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="auth-side">
          <div className="testimonial">
            <h3>Join thousands of creators</h3>
            <p>
              "DigiPratibha helped me create a stunning portfolio that landed me my
              dream job. The platform is incredibly intuitive and professional."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">
                <i className="fas fa-user"></i>
              </div>
              <div className="author-info">
                <strong>Immortal</strong>
                <span>Web Developer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
