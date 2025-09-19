import React from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import "../styles/About.scss";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <Navigation />

      {/* Hero Section */}
      <section
        className="about-hero text-center text-white py-5"
        style={{
          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        }}
      >
        <div className="container">
          <h1 className="fw-bold mb-3">About DigiPratibha</h1>
          <p className="lead mx-auto" style={{ maxWidth: "800px" }}>
            Empowering professionals, students, and creators to build stunning
            digital portfolios in just a few minutes.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="about-content py-5">
        <div className="container">
          <div className="row g-4">
            {/* Mission */}
            <div className="col-md-6">
              <div className="p-4 rounded shadow-sm bg-white h-100">
                <h3 className="fw-bold mb-3">Our Mission</h3>
                <p>
                  At DigiPratibha, our mission is to simplify portfolio creation.
                  We provide easy-to-use tools, customizable templates, and
                  powerful features so you can focus on showcasing your skills
                  instead of struggling with design or code.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="col-md-6">
              <div className="p-4 rounded shadow-sm bg-white h-100">
                <h3 className="fw-bold mb-3">Our Vision</h3>
                <p>
                  We envision a world where everyone, regardless of technical
                  expertise, can share their work and talent with confidence.
                  DigiPratibha is here to bridge the gap between creativity and
                  technology.
                </p>
              </div>
            </div>

            {/* Who We Serve */}
            <div className="col-md-12">
              <div className="p-4 rounded shadow-sm bg-white">
                <h3 className="fw-bold mb-3">Who We Serve</h3>
                <p>
                  Our platform is designed for students, freelancers,
                  entrepreneurs, artists, developers, and professionals from
                  every industry. Whether you're applying for your dream job,
                  pitching clients, or simply showcasing your creativity,
                  DigiPratibha makes it possible in minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="about-cta text-center text-white py-5"
        style={{
          background: "linear-gradient(135deg, #2575fc 0%, #6a11cb 100%)",
        }}
      >
        <div className="container">
          <h2 className="fw-bold mb-3">Start Your Portfolio Journey Today</h2>
          <p className="lead mb-4">
            Join thousands of creators and professionals already using DigiPratibha.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            {/* Swapped button order */}
            <button
              className="btn-back-home"
              onClick={() => navigate("/")}
            >
              ← Back to Home
            </button>
            <button
              className="btn-gradient"
              onClick={() => navigate("/signup")}
            >
              Get Started →
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
