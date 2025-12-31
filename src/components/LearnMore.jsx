import React from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import "../styles/LearnMore.scss";

const LearnMore = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: 1,
      title: "Choose from a Wide Selection of Templates",
      description: `Browse our library of modern, responsive templates tailored to different 
      professions — from developers and designers to photographers and business professionals. 
      Each template is customizable, so you can start with a strong foundation that matches your style.`,
    },
    {
      number: 2,
      title: "Upload Your Work & Organize Projects",
      description: `Easily upload images, documents, videos, or links to your projects. 
      Group them by category (e.g., design, coding, writing) so employers and clients 
      can quickly find what matters most.`,
    },
    {
      number: 3,
      title: "Customize Without Any Code",
      description: `Personalize your portfolio with your bio, education, skills, and achievements. 
      Our drag-and-drop editor ensures you can arrange sections, tweak colors, 
      and adjust layouts — all without needing technical skills.`,
    },
    {
      number: 4,
      title: "Get Your Own Domain",
      description: `Publish instantly on a DigiPratibha subdomain, or connect your own 
      custom domain to look even more professional. Secure hosting ensures your portfolio 
      is available worldwide 24/7.`,
    },
    {
      number: 5,
      title: "Promote Your Work with Built-in Tools",
      description: `Reach more people by sharing your portfolio across social media. 
      Our platform also supports SEO-friendly designs so your work can be discovered on Google. 
      Advanced analytics help you track views and engagement.`,
    },
    {
      number: 6,
      title: "Keep Growing & Updating",
      description: `Your portfolio evolves with you. Update your projects, add testimonials, 
      or showcase new achievements anytime — ensuring you always put your best foot forward.`,
    },
  ];

  return (
    <div className="learnmore-page">
      <Navigation />

      {/* Hero Section */}
      <section
        className="learnmore-hero text-center text-white py-5"
        style={{
          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        }}
      >
        <div className="container">
          <h1 className="fw-bold mb-3">Learn More About Building Your Portfolio</h1>
          <p className="lead mx-auto" style={{ maxWidth: "800px" }}>
            A deeper look into how DigiPratibha helps you craft a professional portfolio 
            in just a few simple steps.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="learnmore-steps py-5">
        <div className="container">
          {steps.map((step) => (
            <div
              key={step.number}
              className="learnmore-step d-flex align-items-start mb-4 p-4 rounded shadow-sm"
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
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="learnmore-cta text-center text-white py-5"
        style={{
          background: "linear-gradient(135deg, #2575fc 0%, #6a11cb 100%)",
        }}
      >
        <div className="container">
          <h2 className="fw-bold mb-3">Ready to Build Your Portfolio?</h2>
          <p className="lead mb-4">
            Join thousands of creators and professionals already showcasing their work with DigiPratibha.
          </p>
          {/* White Get Started Button */}
          <a href="/signup" className="btn-gradient-white">
            Get Started →
          </a>

          {/* Back to Home Button */}
          <div className="mt-4">
            <button
              className="btn-back-home"
              onClick={() => navigate("/")}
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LearnMore;
