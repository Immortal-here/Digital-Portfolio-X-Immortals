import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

const FAQ = () => {
  const faqs = [
    {
      id: 1,
      question: "Can I create a website without knowing how to code?",
      answer:
        "Absolutely. DigiPratibha is an intuitive website builder that makes it possible to create a high-quality portfolio without knowing how to code. In the DigiPratibha Editor, you can drag and drop any feature you want and customize it to match the look and feel of your site.",
      defaultOpen: true,
    },
    {
      id: 2,
      question: "Should I use a website builder or hire a developer?",
      answer:
        "DigiPratibha's no-code website builder is intuitive to use and will cost you significantly less than hiring a developer. However, if you are looking for expert help, you can hire a freelance web developer through platforms like Upwork at a cost that suits your budget.",
    },
    {
      id: 3,
      question: "Does my free website come with hosting?",
      answer:
        "When you create a website with DigiPratibha, you not only get reliable, scalable multi-cloud web hosting that ensures 99.98% uptime, but also automatic disaster recovery and worldwide CDN coverage.",
    },
    {
      id: 4,
      question: "How can I connect a domain to my website?",
      answer:
        "When you create a free website with DigiPratibha, it comes with a DigiPratibha subdomain. To look more professional, you can get a custom domain name. If you already own a domain name, you can connect it to your DigiPratibha site through the domain settings.",
    },
    {
      id: 5,
      question: "How can I design a logo for my website for free?",
      answer:
        "You can design your own logo for free with the intuitive DigiPratibha Logo Maker. If you need high-resolution files, you can purchase and download your logo from the logo maker at any time.",
    },
    {
      id: 6,
      question: "Is it free to make a portfolio website?",
      answer:
        "Yes, DigiPratibha offers free plans to create and publish your portfolio site. You can upgrade to premium plans for additional features like custom domains, advanced analytics, and priority support.",
    },
  ];

  return (
    <div className="faq-container">
      <Navigation />

      <div className="faq-content">
        <div className="faq-wrapper">
          <h1>Frequently Asked Questions</h1>

          <div className="accordion" id="faqAccordion">
            {faqs.map((faq, index) => (
              <div key={faq.id} className="accordion-item">
                <h2 className="accordion-header" id={`heading${faq.id}`}>
                  <button
                    className={`accordion-button ${!faq.defaultOpen ? "collapsed" : ""}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${faq.id}`}
                  >
                    {faq.question}
                  </button>
                </h2>
                <div
                  id={`collapse${faq.id}`}
                  className={`accordion-collapse collapse ${faq.defaultOpen ? "show" : ""}`}
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-support">
            <h3>Still have questions?</h3>
            <p>Our support team is here to help you succeed</p>
            <a href="/contact">Contact Support</a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;
