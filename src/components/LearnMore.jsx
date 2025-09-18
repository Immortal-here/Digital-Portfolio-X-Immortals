import React from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import "../styles/LearnMore.scss"; // create this file

const LearnMore = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: 1,
      title: "Choose from a wide selection of templates",
      summary:
        "Pick a professionally designed template that matches your style and industry — from minimal developer layouts to visual-heavy photographer templates.",
      details: [
        "How to choose: evaluate layout (single page vs multi-page), typography, portfolio gallery styles and built-in sections.",
        "Tip: pick a template that showcases the type of work you want to land (e.g., case-study forward for product design vs image-forward for photography).",
        "Checklist:",
        ["Layout fits your content", "Readable typography", "Good mobile responsiveness", "Gallery or project template available"],
      ],
    },

    {
      number: 2,
      title: "Upload and organize your work",
      summary:
        "Add your projects, images, screenshots and links. Organize them into categories or case studies for easy browsing.",
      details: [
        "Best practices for assets: use high-quality but optimized images, include descriptive captions and link to live demos or repos.",
        "Organizing: group by project type (Client work / Personal / School), or by medium (Illustration / Web / Photo).",
        "Checklist:",
        ["Compress images to web-friendly sizes", "Add short descriptions and tech stack", "Tag projects with categories"],
      ],
    },

    {
      number: 3,
      title: "Customize your site with zero code",
      summary:
        "Add your name, professional title, About section, Skills, Education, Experience and Testimonials with the visual editor—no coding required.",
      details: [
        "What to customize: hero headline, profile picture, contact links, sections order and color accents.",
        "UX tip: keep the hero clear — name, role, one-line pitch and call-to-action (contact / view work).",
        "Checklist:",
        ["Clear headline", "Concise About paragraph", "Prominent CTA (contact/download CV)", "Accessible color contrast"],
      ],
    },

    {
      number: 4,
      title: "Select a domain, connect and publish",
      summary:
        "Choose a custom domain (or use a subdomain) and publish with one click. DNS and SSL will be handled by the platform.",
      details: [
        "Options: use yourname.com for professionalism or a free subdomain for testing.",
        "Publishing tips: check your meta title/description for SEO and set up analytics before going live.",
        "Checklist:",
        ["Choose domain name", "Connect DNS or use platform domain", "Enable SSL (HTTPS)", "Add Google Analytics or tracking"],
      ],
    },

    {
      number: 5,
      title: "Promote your portfolio and grow",
      summary:
        "Share your portfolio on LinkedIn, GitHub, Dribbble and in job applications. Use SEO basics and social previews to increase discoverability.",
      details: [
        "Promotion ideas: share project walkthrough posts, include portfolio link in email signatures and social bios.",
        "Growth: periodically update with new projects and track visits to see what attracts attention.",
        "Checklist:",
        ["Add Open Graph image & description", "Share projects on social platforms", "Collect testimonials & case study metrics"],
      ],
    },
  ];

  return (
    <div className="learnmore-page">
      <Navigation />

      {/* Hero */}
      <section
        className="lm-hero"
        style={{
          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
          color: "white",
        }}
      >
        <div className="container">
          <h1 className="lm-title">Build a Professional Portfolio — step by step</h1>
          <p className="lm-subtitle">
            Follow these practical, actionable steps and tips to create a portfolio that attracts clients and hiring managers.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="lm-steps container">
        {steps.map((s) => (
          <article key={s.number} className="lm-step-card">
            <div className="lm-step-left">
              <div className="lm-step-number">{s.number}</div>
            </div>

            <div className="lm-step-right">
              <h3 className="lm-step-title">{s.title}</h3>
              <p className="lm-step-summary">{s.summary}</p>

              {/* details list: may contain strings or an array (checklist) */}
              {s.details.map((d, i) =>
                Array.isArray(d) ? (
                  <ul key={i} className="lm-checklist">
                    {d.map((li, idx) => (
                      <li key={idx}>{li}</li>
                    ))}
                  </ul>
                ) : (
                  <p key={i} className="lm-step-detail">
                    {d}
                  </p>
                )
              )}
            </div>
          </article>
        ))}
      </section>

      {/* Extras: SEO, Images, Accessibility, Publish & Promote */}
      <section className="lm-extras container">
        <div className="lm-extra">
          <h3>Optimize your images & performance</h3>
          <p>
            Resize images for web (max width 1600px for hero/project images), use modern formats (WebP where possible), lazy-load gallery images, and add descriptive alt text for accessibility and SEO.
          </p>
          <ul>
            <li>Compress images (tinyjpg, ImageOptim)</li>
            <li>Use descriptive filenames and ALT text</li>
            <li>Lazy-load non-critical images</li>
          </ul>
        </div>

        <div className="lm-extra">
          <h3>SEO & analytics</h3>
          <p>
            Configure meta title/description for each page, set Open Graph tags for social sharing, and connect Google Analytics or simple visit tracking to learn which projects perform best.
          </p>
          <ul>
            <li>Set meaningful page titles</li>
            <li>Add structured data for projects if available</li>
            <li>Track traffic sources and optimize top-performing pages</li>
          </ul>
        </div>

        <div className="lm-extra">
          <h3>Accessibility & responsiveness</h3>
          <p>
            Ensure color contrast, keyboard navigability, and responsive layouts. Test on mobile and low-bandwidth connections.
          </p>
          <ul>
            <li>Use accessible headings and labels</li>
            <li>Test with screen readers and keyboard-only navigation</li>
            <li>Make font sizes legible on small screens</li>
          </ul>
        </div>

        <div className="lm-extra">
          <h3>Publishing & domains</h3>
          <p>
            Choose a memorable domain, configure redirect from old URLs, and ensure SSL is enabled. Consider connecting analytics and a simple contact form before launch.
          </p>
        </div>

        <div className="lm-extra">
          <h3>Promote & maintain</h3>
          <p>
            Share new projects on social media, update your portfolio quarterly, ask for testimonials, and use the portfolio as a living document for your career.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="lm-cta container">
        <div className="cta-row">
          <button className="btn-primary" onClick={() => navigate("/login")}>
            Get Started
          </button>

          <button className="btn-back-home" onClick={() => navigate("/")}>
            ← Back to Home
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LearnMore;
