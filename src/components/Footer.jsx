import React from "react";

const Footer = () => {
  return (
    <footer className="custom-footer text-dark py-5">
      <div className="container">
        <div className="text-center mb-4">
          <h1 className="mb-2">DigiPratibha</h1>
          <p className="mx-auto" style={{ maxWidth: "800px" }}>
            The DigiPratibha website builder offers a complete solution from
            enterprise-grade infrastructure and business features to advanced
            SEO and marketing tools—enabling anyone to create and grow online.
          </p>
        </div>

        <div className="row text-center text-md-start gy-4">
          <div className="col-6 col-md-2">
            
          </div>

          <div className="col-6 col-md-2">
         
          </div>

          <div className="col-6 col-md-2">
            
          </div>

          <div className="col-6 col-md-2">
           
          </div>

          <div className="col-12 col-md-4">
            
          </div>
        </div>

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center border-top pt-4 mt-4 text-center text-md-start">
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
            <a href="https://tiktok.com" className="text-dark me-3">
              <i className="fab fa-tiktok"></i>
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

          <div className="mb-3 mb-md-0">
            <span className="me-3">Terms of Use</span>
            <span className="me-3">Privacy Policy</span>
            <span>© 2006–2025 DigiPratibha.com, Inc</span>
          </div>

          <div>
            <a href="#" className="text-dark me-3">
              About
            </a>
            <a href="#" className="text-dark">
              Contact us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
