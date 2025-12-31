// src/components/PortfolioPreviewPage.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import PortfolioPreview from "./PortfolioPreview";

const PortfolioPreviewPage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    if (!authLoading && user) {
      loadPortfolio();
    }
  }, [user, authLoading]);

  const loadPortfolio = async () => {
    try {
      const portfolioRef = doc(db, "portfolios", user.uid);
      const portfolioSnap = await getDoc(portfolioRef);

      if (portfolioSnap.exists()) {
        const data = portfolioSnap.data();
        setPortfolioData(data);
      }
    } catch (error) {
      console.error("Error loading portfolio:", error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div style={{ paddingTop: "60px", minHeight: "100vh", background: "#f5f7fa" }}>
        <Navigation />
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          minHeight: "calc(100vh - 60px)" 
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: "50px",
              height: "50px",
              border: "4px solid #e5e7eb",
              borderTopColor: "#667eea",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 1rem",
            }}></div>
            <p style={{ color: "#6b7280" }}>Loading Preview...</p>
          </div>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div style={{ paddingTop: "60px", minHeight: "100vh", background: "#f5f7fa" }}>
        <Navigation />
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          minHeight: "calc(100vh - 60px)" 
        }}>
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <div style={{ fontSize: "4rem", color: "#d1d5db", marginBottom: "1rem" }}>
              <i className="fas fa-palette"></i>
            </div>
            <h2 style={{ color: "#1f2937", marginBottom: "1rem", fontSize: "1.5rem" }}>
              No Portfolio Data Found
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
              Please create your portfolio in the builder first.
            </p>
            <button
              onClick={() => navigate("/builder")}
              style={{
                padding: "0.75rem 1.5rem",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              <i className="fas fa-arrow-left" style={{ marginRight: "0.5rem" }}></i>
              Go to Builder
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render clean portfolio preview without debug banner
  return (
    <div style={{ minHeight: "100vh", background: "#ffffff" }}>
      <Navigation />
      <div style={{ paddingTop: "60px" }}>
        <PortfolioPreview
          template={portfolioData.template}
          personalInfo={portfolioData.personalInfo}
          skills={portfolioData.skills}
          projects={portfolioData.projects}
          experience={portfolioData.experience}
          education={portfolioData.education}
          settings={portfolioData.settings}
        />
      </div>
    </div>
  );
};

export default PortfolioPreviewPage;
