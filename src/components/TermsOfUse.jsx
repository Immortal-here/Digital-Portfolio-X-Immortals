import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

const TermsOfUse = () => {
  return (
    <div className="terms-of-use-page">
      <Navigation />

      {/* Hero Section */}
      <section
        className="text-center text-white py-5"
        style={{
          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        }}
      >
        <div className="container">
          <h1 className="fw-bold mb-3">Terms of Use</h1>
          <p className="lead mx-auto" style={{ maxWidth: "800px" }}>
            By accessing and using DigiPratibha, you agree to the following terms
            and conditions.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-5">
        <div className="container">
          <div className="p-4 rounded shadow-sm bg-white mb-4">
            <h3 className="fw-bold mb-3">1. Acceptance of Terms</h3>
            <p>
              By using DigiPratibha, you confirm that you have read, understood,
              and agree to be bound by these Terms of Use. If you do not agree,
              please discontinue use of our platform immediately.
            </p>
          </div>

          <div className="p-4 rounded shadow-sm bg-white mb-4">
            <h3 className="fw-bold mb-3">2. User Responsibilities</h3>
            <p>
              You are responsible for the accuracy of the information you provide
              and the content you publish on your portfolio. You agree not to use
              DigiPratibha for unlawful, harmful, or offensive purposes.
            </p>
          </div>

          <div className="p-4 rounded shadow-sm bg-white mb-4">
            <h3 className="fw-bold mb-3">3. Intellectual Property</h3>
            <p>
              All templates, features, and tools offered by DigiPratibha are
              protected by copyright and intellectual property laws. You may not
              copy, redistribute, or resell our platform’s content without prior
              written permission.
            </p>
          </div>

          <div className="p-4 rounded shadow-sm bg-white mb-4">
            <h3 className="fw-bold mb-3">4. Account Suspension</h3>
            <p>
              We reserve the right to suspend or terminate accounts that violate
              our Terms, engage in abusive behavior, or misuse our platform.
            </p>
          </div>

          <div className="p-4 rounded shadow-sm bg-white mb-4">
            <h3 className="fw-bold mb-3">5. Limitation of Liability</h3>
            <p>
              DigiPratibha is not liable for any damages, data loss, or business
              disruptions caused by the use or inability to use the platform.
              Your use of DigiPratibha is at your own risk.
            </p>
          </div>

          <div className="p-4 rounded shadow-sm bg-white">
            <h3 className="fw-bold mb-3">6. Contact Us</h3>
            <p>
              For questions regarding these Terms of Use, please contact us at:{" "}
              <a href="mailto:support@digipratibha.com">
                support@digipratibha.com
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsOfUse;
