import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navigation.scss";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (p) => location.pathname === p;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (e) {
      console.error("Logout failed:", e);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={() => setIsMenuOpen(false)}>
          <img src="/digipratibha_favicon_64.ico" alt="DigiPratibha" className="logo-image" />
          <span className="logo-text">DigiPratibha</span>
        </Link>

        <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>
            <i className="fas fa-home"></i> Home
          </Link>
          <Link to="/templates" className={`nav-link ${isActive("/templates") ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>
            <i className="fas fa-th-large"></i> Templates
          </Link>
          <Link to="/builder" className={`nav-link ${isActive("/builder") ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>
            <i className="fas fa-tools"></i> Builder
          </Link>
          <Link to="/faq" className={`nav-link ${isActive("/faq") ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>
            <i className="fas fa-question-circle"></i> FAQ
          </Link>
          <Link to="/contact" className={`nav-link ${isActive("/contact") ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>
            <i className="fas fa-envelope"></i> Contact
          </Link>

          {user ? (
            <div className="nav-user-section">
              <span className="user-greeting">👋 {user.displayName || user.email}</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <div className="nav-auth-buttons">
              <Link to="/login" className="auth-btn login-btn" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
              <Link to="/signup" className="auth-btn signup-btn" onClick={() => setIsMenuOpen(false)}>
                Sign Up
              </Link>
            </div>
          )}
        </div>

        <div className={`nav-toggle ${isMenuOpen ? "active" : ""}`} onClick={() => setIsMenuOpen((v) => !v)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
