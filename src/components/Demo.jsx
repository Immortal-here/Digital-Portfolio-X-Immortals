import React from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import "../styles/Demo.scss"; // 👈 import the new SCSS file

const Demo = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: 1,
      title: "Sign Up / Login",
      description: "Create your DigiPratibha account to get started with your portfolio journey.",
    },
    {
      number: 2,
      title: "Choose a Template",
      description: "Pick from a wide range of professional and creative templates tailored for portfolios.",
    },
    {
      number: 3,
      title: "Customize Your Portfolio",
      description: "Add personal details, education, skills, projects, and experience in just a few clicks.",
    },
    {
      number: 4,
      title: "Add Work Samples",
      description: "Upload images, add project links, or embed content to showcase your best work.",
    },
    {
      number: 5,
      title: "Publish Instantly",
      description: "Click publish and your portfolio goes live with a unique, shareable link.",
    },
    {
      number: 6,
      title: "Promote & Grow",
      description: "Share your portfolio with employers, clients, and peers to unlock opportunities.",
    },
  ];

  return (
    <div className="demo-page">
      <Navigation />

      {/* Hero Section */}
      <section
        className="demo-hero text-center py-5"
        style={{
          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
          color: "white",
        }}
      >
        <div className="container">
          <h1 className="fw-bold mb-3">How to Build Your Portfolio in Minutes</h1>
          <p className="lead">
            Follow these simple steps to create a stunning and professional online portfolio.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="demo-steps py-5">
        <div className="container">
          {steps.map((step) => (
            <div
              key={step.number}
              className="demo-step d-flex align-items-start mb-4 p-4 rounded shadow-sm"
              style={{ background: "#fff" }}
            >
              <div
                className="step-number me-3 d-flex align-items-center justify-content-center fw-bold text-white"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                }}
              >
                {step.number}
              </div>
              <div>
                <h4 className="fw-semibold">{step.title}</h4>
                <p className="text-muted mb-0">{step.description}</p>
              </div>
            </div>
          ))}

          {/* ✅ Back to Home Button */}
          <div className="text-center mt-5">
           <button className="btn-back-home" onClick={() => navigate("/")}>
  ← Back to Home
</button>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Demo;
