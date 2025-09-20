import React from "react";
import { Link } from "react-router-dom"; // 👈 Import Link for routing

const Footer = () => {
  return (
    <footer className="custom-footer text-dark py-5">
      <div className="container">
        <div className="text-center mb-4">
          <h1 className="mb-2">DigiPratibha</h1>
          <p className="mx-auto" style={{ maxWidth: "800px" }}>
            DigiPratibha is an online portfolio builder that offers a complete solution from
            time-consuming portfolio making to effortless resumes in just a few minutes.
          </p>
        </div>

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center border-top pt-4 mt-4 text-center text-md-start">
          {/* Social Links */}
          <div className="mb-3 mb-md-0">
            <a href="https://facebook.com" className="text-dark me-3">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://youtube.com" className="text-dark me-3">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="https://instagram.com" className="text-dark me-3">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://pinterest.com" className="text-dark me-3">
              <i className="fab fa-pinterest"></i>
            </a>
            <a href="https://twitter.com" className="text-dark me-3">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" className="text-dark">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>

          {/* Policies */}
          <div className="mb-3 mb-md-0">
            <Link to="/terms" className="me-3 text-dark">
              Terms of Use
            </Link>
            <Link to="/privacy" className="me-3 text-dark">
              Privacy Policy
            </Link>
            <span>© DigiPratibha.com, Inc</span>
          </div>

          {/* Navigation Links */}
          <div>
            <Link to="/about" className="text-dark me-3">
              About Us
            </Link>
            <Link to="/contact" className="text-dark">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
