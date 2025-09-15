// src/components/Signup.jsx
// Rewritten to use Firebase Authentication instead of axios backend
// Supports email/password signup and Google signup

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Forms.scss";

// Firebase imports
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) setError("");
    if (name === "password") calculatePasswordStrength(value);
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthText = () => {
    const texts = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    return texts[passwordStrength] || "Very Weak";
  };

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields");
      return false;
    }
    if (formData.username.length < 3) {
      setError("Username must be at least 3 characters long");
      return false;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      setError("Username can only contain letters, numbers, and underscores");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    if (passwordStrength < 3) {
      setError("Please choose a stronger password");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!isTermsAccepted) {
      setError("Please accept the Terms of Service and Privacy Policy");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const cleanedEmail = formData.email.trim().toLowerCase();
      const cred = await createUserWithEmailAndPassword(auth, cleanedEmail, formData.password);
      // set displayName
      await updateProfile(cred.user, { displayName: formData.username });

      const token = await cred.user.getIdToken();
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: cred.user.uid,
          name: formData.username,
          email: cleanedEmail,
        })
      );

      alert("Account created successfully! 🎉");
      navigate("/dashboard");
      setFormData({ username: "", email: "", password: "", confirmPassword: "" });
      setIsTermsAccepted(false);
    } catch (err) {
      console.error("❌ Registration error:", err);
      const code = err?.code || "";
      if (code === "auth/email-already-in-use") {
        setError("This email is already registered. Please use a different email.");
      } else if (code === "auth/weak-password") {
        setError("Password is too weak.");
      } else {
        setError(err?.message || "Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const token = await user.getIdToken();
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: user.uid,
          name: user.displayName,
          email: user.email,
        })
      );
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Google signup error:", err);
      setError(err?.message || "Google signup failed.");
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
            <h1>Create Account</h1>
            <p>Join thousands of creators building amazing portfolios</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && (
              <div className="alert alert-error">
                <i className="fas fa-exclamation-circle"></i>
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-wrapper">
                <i className="fas fa-user input-icon"></i>
                <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Choose a username (3+ characters)"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                  disabled={loading}
                  minLength={3}
                  maxLength={20}
                />
              </div>
            </div>

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
                  placeholder="Create a strong password (8+ characters)"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                  disabled={loading}
                  minLength={8}
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
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div
                      className={`strength-fill strength-${passwordStrength}`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span className={`strength-text strength-${passwordStrength}`}>
                    {getPasswordStrengthText()}
                  </span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-wrapper">
                <i className="fas fa-lock input-icon"></i>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={loading}
                >
                  <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <div className="password-mismatch">
                  <i className="fas fa-times-circle"></i>
                  Passwords do not match
                </div>
              )}
            </div>

            <div className="form-options">
              <label className="checkbox-wrapper">
                <input
                  type="checkbox"
                  checked={isTermsAccepted}
                  onChange={(e) => setIsTermsAccepted(e.target.checked)}
                  disabled={loading}
                  required
                />
                <span className="checkmark"></span>I agree to the {" "}
                <Link to="/terms" target="_blank">Terms of Service</Link> and {" "}
                <Link to="/privacy" target="_blank">Privacy Policy</Link>
              </label>
            </div>

            <button
              type="submit"
              className={`auth-btn primary ${loading ? "loading" : ""}`}
              disabled={loading || !isTermsAccepted}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Creating Account...
                </>
              ) : (
                <>
                  <i className="fas fa-user-plus"></i>
                  Create Account
                </>
              )}
            </button>

            <div className="divider">
              <span>or</span>
            </div>

            <button
              type="button"
              className="auth-btn secondary"
              onClick={handleGoogleSignup}
              disabled={loading}
            >
              <i className="fab fa-google"></i>
              Sign up with Google
            </button>

            <div className="auth-footer">
              <p>
                Already have an account?
                <Link to="/login" className="auth-link">Sign in here</Link>
              </p>
            </div>
          </form>
        </div>

        <div className="auth-side">
          <div className="testimonial">
            <h3>Start your journey today</h3>
            <p>
              "Creating my portfolio with DigiPratibha was a game-changer. The professional templates and easy customization helped me showcase my work perfectly."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">
                <i className="fas fa-user"></i>
              </div>
              <div className="author-info">
                <strong>Immortal</strong>
                <span>Graphic Designer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
