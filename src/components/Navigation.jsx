import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import '../styles/Navigation.scss';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      setUser(res.user);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo + Brand Name */}
        <Link to="/" className="nav-logo">
          <img 
            src="/digipratibha_favicon_64.ico" 
            alt="DigiPratibha Logo" 
            className="logo-image" 
          />
          <span className="logo-text">DigiPratibha</span>
        </Link>
        
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fas fa-home"></i>
            Home
          </Link>
          <Link 
            to="/templates" 
            className={`nav-link ${isActive('/templates') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fas fa-th-large"></i>
            Templates
          </Link>
          <Link 
            to="/builder" 
            className={`nav-link ${isActive('/builder') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fas fa-tools"></i>
            Builder
          </Link>
          <Link 
            to="/faq" 
            className={`nav-link ${isActive('/faq') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fas fa-question-circle"></i>
            FAQ
          </Link>
          <Link 
            to="/contact" 
            className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fas fa-envelope"></i>
            Contact
          </Link>

          {user ? (
            <div className="flex items-center space-x-4 nav-link">
              <span>{user.displayName}</span>
              <button 
                onClick={handleLogout} 
                className="bg-red-500 px-3 py-1 rounded text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLogin} 
              className="bg-purple-600 px-3 py-1 rounded text-white nav-link"
            >
              <i className="fas fa-sign-in-alt"></i>
              Login with Google
            </button>
          )}
        </div>

        <div className="nav-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
