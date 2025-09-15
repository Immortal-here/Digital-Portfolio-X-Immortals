
import React, { useState } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      });
    }, 1000);
  };

  return (
    <div>
      <section style={{
        background: 'linear-gradient(to right, rgba(0, 0, 50, 0.7), rgba(0, 140, 255, 0.7)), url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '200px 20px 100px',
        textAlign: 'center'
      }}>
        <Navigation />
        <div className="container">
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginTop: '40px' }}>
            Contact Us
          </h1>
          <p style={{ fontSize: '18px', marginTop: '20px' }}>
            Get in touch with our team. We're here to help you build something amazing.
          </p>
        </div>
      </section>

      <section style={{ padding: '80px 20px' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div style={{
                background: 'white',
                padding: '50px',
                borderRadius: '20px',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                marginTop: '-100px',
                position: 'relative',
                zIndex: 2
              }}>
                <h2 style={{ 
                  textAlign: 'center', 
                  marginBottom: '20px',
                  color: '#333',
                  fontSize: '32px'
                }}>
                  Let's Start a Conversation
                </h2>
                <p style={{ 
                  textAlign: 'center', 
                  color: '#666', 
                  marginBottom: '40px',
                  fontSize: '16px'
                }}>
                  Please note: all fields are required.
                </p>

                {submitStatus === 'success' && (
                  <div style={{
                    background: '#d4edda',
                    color: '#155724',
                    padding: '15px',
                    borderRadius: '8px',
                    marginBottom: '30px',
                    textAlign: 'center'
                  }}>
                    Thank you for your message! We'll get back to you soon.
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input 
                        type="text" 
                        className="form-control" 
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        style={{
                          padding: '15px',
                          border: '2px solid #ddd',
                          borderRadius: '10px',
                          fontSize: '16px'
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                      <input 
                        type="text" 
                        className="form-control" 
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        style={{
                          padding: '15px',
                          border: '2px solid #ddd',
                          borderRadius: '10px',
                          fontSize: '16px'
                        }}
                      />
                    </div>
                    <div className="col-12">
                      <input 
                        type="email" 
                        className="form-control" 
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{
                          padding: '15px',
                          border: '2px solid #ddd',
                          borderRadius: '10px',
                          fontSize: '16px'
                        }}
                      />
                    </div>
                    <div className="col-12">
                      <textarea 
                        className="form-control" 
                        name="message"
                        rows="6" 
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        style={{
                          padding: '15px',
                          border: '2px solid #ddd',
                          borderRadius: '10px',
                          fontSize: '16px',
                          resize: 'vertical'
                        }}
                      />
                    </div>
                    <div className="col-12 text-center mt-4">
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        style={{
                          background: 'linear-gradient(45deg, #0050ff, #0040cc)',
                          color: 'white',
                          padding: '15px 50px',
                          border: 'none',
                          borderRadius: '30px',
                          fontSize: '16px',
                          fontWeight: '600',
                          cursor: isSubmitting ? 'not-allowed' : 'pointer',
                          transition: 'all 0.3s ease',
                          opacity: isSubmitting ? 0.7 : 1
                        }}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="row mt-5">
            <div className="col-md-4 text-center mb-4">
              <div style={{
                background: 'white',
                padding: '30px',
                borderRadius: '15px',
                boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
                height: '100%'
              }}>
                <div style={{ 
                  background: '#0050ff', 
                  color: 'white', 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '24px'
                }}>
                  📧
                </div>
                <h4 style={{ color: '#333', marginBottom: '15px' }}>Email Us</h4>
                <p style={{ color: '#666' }}>
                  support@DigiPratibha.com<br/>
                  hello@DigiPratibha.com
                </p>
              </div>
            </div>

            <div className="col-md-4 text-center mb-4">
              <div style={{
                background: 'white',
                padding: '30px',
                borderRadius: '15px',
                boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
                height: '100%'
              }}>
                <div style={{ 
                  background: '#0050ff', 
                  color: 'white', 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '24px'
                }}>
                  💬
                </div>
                <h4 style={{ color: '#333', marginBottom: '15px' }}>Live Chat</h4>
                <p style={{ color: '#666' }}>
                  Available 24/7<br/>
                  Quick response time
                </p>
              </div>
            </div>

            <div className="col-md-4 text-center mb-4">
              <div style={{
                background: 'white',
                padding: '30px',
                borderRadius: '15px',
                boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
                height: '100%'
              }}>
                <div style={{ 
                  background: '#0050ff', 
                  color: 'white', 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '24px'
                }}>
                  ⚡️
                </div>
                <h4 style={{ color: '#333', marginBottom: '15px' }}>Services</h4>
                <p style={{ color: '#666' }}>
                  Lightning Fast Response<br/>
                  Serving clients worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
