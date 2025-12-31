// src/components/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Navigation from "./Navigation";
import ExportPortfolio from "./ExportPortfolio"; // <-- Import this!
import "../styles/Dashboard.scss";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [portfolioExists, setPortfolioExists] = useState(false);
  const [portfolioData, setPortfolioData] = useState(null);
  const [loadingPortfolio, setLoadingPortfolio] = useState(true);
  const [showExport, setShowExport] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      checkPortfolio();
    }
  }, [user, loading]);

  const checkPortfolio = async () => {
    try {
      const portfolioRef = doc(db, "portfolios", user.uid);
      const portfolioSnap = await getDoc(portfolioRef);
      if (portfolioSnap.exists()) {
        setPortfolioExists(true);
        setPortfolioData(portfolioSnap.data());
      } else {
        setPortfolioExists(false);
      }
    } catch (error) {
      console.error("Error checking portfolio:", error);
    } finally {
      setLoadingPortfolio(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "Never";
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return "Recently";
    }
  };

  if (loading || loadingPortfolio) {
    return (
      <div className="dashboard-container">
        <Navigation />
        <div className="loading-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading Dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Navigation />

      <div className="dashboard-content">
        <div className="dashboard-hero">
          <div className="hero-background">
            <div className="gradient-orb orb-1"></div>
            <div className="gradient-orb orb-2"></div>
            <div className="gradient-orb orb-3"></div>
          </div>

          <div className="hero-content">
            <div className="profile-section">
              <div className="profile-avatar">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || "User"} />
                ) : (
                  <div className="avatar-placeholder">
                    <i className="fas fa-user"></i>
                  </div>
                )}
              </div>
              <div className="profile-info">
                <h1 className="welcome-text">
                  Welcome back, <span className="user-name">{user?.displayName || "User"}</span>
                </h1>
                <p className="user-email">{user?.email}</p>
                <div className="quick-stats">
                  <div className="stat-item">
                    <i className="fas fa-check-circle"></i>
                    <span>
                      {portfolioExists ? "Portfolio Active" : "No Portfolio"}
                    </span>
                  </div>
                  {portfolioData?.updatedAt && (
                    <div className="stat-item">
                      <i className="fas fa-clock"></i>
                      <span>Updated {formatDate(portfolioData.updatedAt)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="cta-section">
              {portfolioExists ? (
                <>
                  <button
                    className="cta-btn primary"
                    onClick={() => navigate("/builder")}
                  >
                    <i className="fas fa-edit"></i>
                    Continue Editing
                  </button>
                  <button
                    className="cta-btn secondary"
                    onClick={() => navigate("/preview")}
                  >
                    <i className="fas fa-eye"></i>
                    View Portfolio
                  </button>
                </>
              ) : (
                <button
                  className="cta-btn primary"
                  onClick={() => navigate("/builder")}
                >
                  <i className="fas fa-plus-circle"></i>
                  Start Building Portfolio
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-icon templates">
              <i className="fas fa-th-large"></i>
            </div>
            <h3>Choose Template</h3>
            <p>Select from our collection of professional templates</p>
            <button className="card-btn" onClick={() => navigate("/templates")}>
              <span>Browse Templates</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
          <div className="dashboard-card">
            <div className="card-icon builder">
              <i className="fas fa-tools"></i>
            </div>
            <h3>Portfolio Builder</h3>
            <p>Create and customize your digital portfolio</p>
            <button className="card-btn" onClick={() => navigate("/builder")}>
              <span>Open Builder</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
          <div className="dashboard-card">
            <div className="card-icon preview">
              <i className="fas fa-eye"></i>
            </div>
            <h3>Preview</h3>
            <p>See how your portfolio looks in real-time</p>
            <button
              className="card-btn"
              onClick={() => navigate("/preview")}
              disabled={!portfolioExists}
            >
              <span>View Preview</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
          <div className="dashboard-card">
            <div className="card-icon export">
              <i className="fas fa-download"></i>
            </div>
            <h3>Export</h3>
            <p>Download your portfolio as HTML or PDF</p>
            <button
              className="card-btn"
              onClick={() => setShowExport(true)}
              disabled={!portfolioExists}
            >
              <span>Export Now</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>

        {showExport && (
          <ExportPortfolio
            portfolioData={portfolioData}
            onCancel={() => setShowExport(false)}
          />
        )}

        {portfolioExists && portfolioData && (
          <div className="portfolio-summary">
            <h2 className="summary-title">Your Portfolio Summary</h2>
            <div className="summary-grid">
              <div className="summary-card">
                <div className="summary-icon">
                  <i className="fas fa-briefcase"></i>
                </div>
                <div className="summary-content">
                  <span className="summary-count">
                    {portfolioData.projects?.length || 0}
                  </span>
                  <span className="summary-label">Projects</span>
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-icon">
                  <i className="fas fa-code"></i>
                </div>
                <div className="summary-content">
                  <span className="summary-count">
                    {portfolioData.skills?.length || 0}
                  </span>
                  <span className="summary-label">Skills</span>
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-icon">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <div className="summary-content">
                  <span className="summary-count">
                    {portfolioData.education?.length || 0}
                  </span>
                  <span className="summary-label">Education</span>
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-icon">
                  <i className="fas fa-building"></i>
                </div>
                <div className="summary-content">
                  <span className="summary-count">
                    {portfolioData.experience?.length || 0}
                  </span>
                  <span className="summary-label">Experience</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
