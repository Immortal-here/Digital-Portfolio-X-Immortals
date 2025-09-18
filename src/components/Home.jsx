import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import '../styles/Home.scss';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Navigation />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center min-vh-100">
            <div className="col-lg-6 col-md-8">
              <div className="hero-content">
                <h1 className="hero-title">
                  Create your <span className="text-gradient">Stunning Portfolios</span> in Seconds
                </h1>

                <ul className="hero-features">
                  <li>Unleash your creative potential with DigiPratibha</li>
                  <li>Showcase your Professional Portfolio's online to not only create impact but to achieve Success </li>
                  <li>Perfect for Students, Buisness Professionals, Artists, Photographers and Creatives</li>
                </ul>

                <div className="hero-actions">
                  {/* ✅ Button navigates to login */}
                  <button className="btn-primary" onClick={() => navigate('/login')}>
                    Get Started
                  </button>
                  
                  {/* ✅ Button navigates to demo */}
                  <button className="btn-secondary" onClick={() => navigate('/demo')}>
                    Watch Demo
                  </button>
                </div>

                <p className="hero-note">
                  Start your professional portfolio creating journey with DigiPratibha
                </p>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="hero-image">
                <img 
                  src="/Images/code.jpg" 
                  alt="Portfolio showcase"
                  className="img-fluid"
                />
                <div className="hero-image-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Portfolio building, made easy</h2>
            <p className="section-subtitle">
              Join over 250,000 creators building stunning portfolios with DigiPratibha.
              Our beginner-friendly editor helps you launch your personal portfolio without any coding.
            </p>
          </div>

          <div className="row g-4 mt-5">
            {[
              { title: 'Copywriters', image: '/Images/copywriter.jpg' },
              { title: 'Photographers', image: 'Images/photographer.jpg' },
              { title: 'Artists', image: '/Images/artist.jpg' },
              { title: 'Graphic Designers', image: '/Images/GraphicDesigner.jpg' },
              { title: 'Videographers', image: '/Images/videographer.jpg' },
              { title: 'Architects', image: '/Images/Architects.jpg' },
            ].map((item, index) => (
              <div key={index} className="col-lg-2 col-md-4 col-sm-6">
                <div className="feature-card">
                  <div className="feature-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <h4 className="feature-title">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="process-content">
                <h2 className="process-title">How to make your Professional Portfolio</h2>
                <div className="process-actions">
                  {/* ✅ Button navigates to Learn More page */}
                  <button className="btn-outline" onClick={() => navigate('/learn-more')}>
                    Learn more →
                  </button>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="process-steps">
                {[
                  'Choose from a wide selection of templates.',
                  'Upload images of your work and organize them into projects.',
                  'Customize your site to perfection with zero code needed.',
                  'Select a domain name, connect and publish.',
                  'Promote your online portfolio with a suite of in-house marketing tools.'
                ].map((step, index) => (
                  <div key={index} className="process-step">
                    <span className="step-number">{index + 1}</span>
                    <p className="step-text">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Portfolio Website FAQ</h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion" id="faqAccordion">
                {[
                  {
                    id: 'One',
                    question: 'What is a portfolio website?',
                    answer: 'A portfolio website is a digital showcase of your work, skills, and achievements.',
                    show: true
                  },
                  {
                    id: 'Two',
                    question: 'Why make an online portfolio?',
                    answer: 'An online portfolio helps you reach a broader audience and builds credibility.'
                  },
                  {
                    id: 'Three',
                    question: 'What kind of portfolios can I build on DigiPratibha?',
                    answer: 'You can build portfolios for photography, design, writing, music, and more.'
                  },
                  {
                    id: 'Four',
                    question: 'What makes a good online portfolio?',
                    answer: 'A clear layout, strong visuals, and easy navigation make a great portfolio.'
                  },
                  {
                    id: 'Five',
                    question: 'Is it free to make a portfolio on this website?',
                    answer: "Yes, DigiPratibha offers to create and publish your professional portfolio's."
                  }
                ].map((faq, index) => (
                  <div key={index} className="accordion-item">
                    <h2 className="accordion-header" id={`heading${faq.id}`}>
                      <button 
                        className={`accordion-button ${!faq.show ? 'collapsed' : ''}`}
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target={`#collapse${faq.id}`}
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div 
                      id={`collapse${faq.id}`} 
                      className={`accordion-collapse collapse ${faq.show ? 'show' : ''}`}
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
