import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-page">
      <Navigation />

      {/* Hero */}
      <section
        className="text-center text-white py-5"
        style={{
          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        }}
      >
        <div className="container">
          <h1 className="fw-bold mb-3">Privacy Policy</h1>
          <p className="lead mx-auto" style={{ maxWidth: "800px" }}>
            This Privacy Policy explains how DigiPratibha collects, uses, and
            protects your personal data.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-5">
        <div className="container">
          <div className="p-4 rounded shadow-sm bg-white mb-4">
            <h3 className="fw-bold mb-3">1. Information We Collect</h3>
            <p>
              We may collect information you provide directly (name, email,
              profile details), content you upload (images, text), and usage
              data (pages viewed, interactions). We also use cookies and similar
              technologies to improve the service.
            </p>
          </div>

          <div className="p-4 rounded shadow-sm bg-white mb-4">
            <h3 className="fw-bold mb-3">2. How We Use Your Data</h3>
            <p>
              We use data to provide and improve our service, personalize your
              experience, process transactions, and communicate updates. We do
              not sell your personal data to third parties.
            </p>
          </div>

          <div className="p-4 rounded shadow-sm bg-white mb-4">
            <h3 className="fw-bold mb-3">3. Cookies & Tracking</h3>
            <p>
              We use cookies for session management, analytics, and to improve
              user experience. You can control cookies via your browser settings.
            </p>
          </div>

          <div className="p-4 rounded shadow-sm bg-white mb-4">
            <h3 className="fw-bold mb-3">4. Data Security</h3>
            <p>
              We follow industry best practices to protect your data, including
              encrypted connections (HTTPS) and secure storage. However, no
              system is 100% secure — please avoid uploading highly sensitive
              personal data.
            </p>
          </div>

          <div className="p-4 rounded shadow-sm bg-white">
            <h3 className="fw-bold mb-3">5. Your Rights</h3>
            <p>
              You can access, correct, or delete your personal data. For
              requests, contact:{" "}
              <a href="mailto:digipratibhaofficial@gmail.com">digipratibhaofficial@gmail.com</a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
