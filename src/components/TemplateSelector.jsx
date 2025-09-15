import React, { useState } from "react";
import "../styles/TemplateSelector.scss";

const TemplateSelector = ({ onTemplateSelect, selectedTemplate }) => {
  const templates = [
    {
      id: "modern-developer",
      name: "Modern Developer",
      category: "Developer",
      image:
        "/Images/ModernDeveloper.jpg",
      description: "Clean and modern design perfect for developers",
      colors: ["#0050ff", "#00d4aa", "#ff6b6b"],
      features: [
        "Dark/Light Mode",
        "Code Syntax Highlighting",
        "Project Gallery",
      ],
    },
    {
      id: "creative-artist",
      name: "Creative Artist",
      category: "Creative",
      image:
        "/Images/Creative Artist.jpg",
      description: "Artistic layout for creative professionals",
      colors: ["#ff6b6b", "#4ecdc4", "#45b7d1"],
      features: ["Image Gallery", "Video Showcase", "Color Customization"],
    },
    {
      id: "business-professional",
      name: "Business Professional",
      category: "Business",
      image:
        "/Images/Bussiness .jpg",
      description: "Professional design for business consultants",
      colors: ["#2c3e50", "#3498db", "#e74c3c"],
      features: ["Timeline View", "Contact Forms", "Testimonials"],
    },
    {
      id: "photographer-portfolio",
      name: "Photographer",
      category: "Photography",
      image:
        "/Images/photograph.jpg",
      description: "Image-focused layout for photographers",
      colors: ["#34495e", "#f39c12", "#e67e22"],
      features: ["Full Screen Gallery", "Lightbox", "Client Proofing"],
    },
    {
      id: "designer-showcase",
      name: "Designer Portfolio",
      category: "Design",
      image: "/Images/Designer.jpg",
      description: "Elegant design showcase for designers",
      colors: ["#9b59b6", "#e74c3c", "#f1c40f"],
      features: [
        "Case Studies",
        "Process Documentation",
        "Interactive Elements",
      ],
    },
    {
      id: "minimal-clean",
      name: "Minimal Portfolio",
      category: "Minimal",
      image:
        "/Images/minimal.jpg",
      description: "Clean minimal design for any profession",
      colors: ["#2c3e50", "#95a5a6", "#ecf0f1"],
      features: ["Typography Focus", "White Space", "Fast Loading"],
    },
    {
      id: "freelancer-hub",
      name: "Freelancer Hub",
      category: "Freelancer",
      image:
        "/Images/freelancer.jpg",
      description: "Perfect for freelancers and consultants",
      colors: ["#16a085", "#27ae60", "#2980b9"],
      features: ["Service Pricing", "Booking System", "Client Portal"],
    },
    {
      id: "startup-founder",
      name: "Startup Founder",
      category: "Startup",
      image: "/Images/startup.jpg",
      description: "Dynamic layout for entrepreneurs",
      colors: ["#e74c3c", "#f39c12", "#d35400"],
      features: ["Pitch Deck", "Team Showcase", "Investor Relations"],
    },
  ];

  const [filterCategory, setFilterCategory] = useState("All");
  const categories = ["All", ...new Set(templates.map((t) => t.category))];

  const filteredTemplates =
    filterCategory === "All"
      ? templates
      : templates.filter((t) => t.category === filterCategory);

  return (
    <div className="template-selector">
      <div className="template-header">
        <h2>
          <i className="fas fa-palette"></i> Choose Your Template
        </h2>
        <p>Select a professional template that matches your style</p>
      </div>

      <div className="template-filters">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-btn ${filterCategory === category ? "active" : ""}`}
            onClick={() => setFilterCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="templates-grid">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className={`template-card ${selectedTemplate?.id === template.id ? "selected" : ""}`}
            onClick={() => onTemplateSelect(template)}
          >
            <div className="template-preview">
              <img src={template.image} alt={template.name} />
              <div className="template-overlay">
                <button className="preview-btn">
                  <i className="fas fa-eye"></i>
                  Preview
                </button>
              </div>
            </div>

            <div className="template-info">
              <h3>{template.name}</h3>
              <span className="template-category">{template.category}</span>
              <p>{template.description}</p>

              <div className="template-colors">
                {template.colors.map((color, index) => (
                  <div
                    key={index}
                    className="color-dot"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>

              <div className="template-features">
                {template.features.slice(0, 2).map((feature, index) => (
                  <span key={index} className="feature-tag">
                    {feature}
                  </span>
                ))}
                {template.features.length > 2 && (
                  <span className="more-features">
                    +{template.features.length - 2} more
                  </span>
                )}
              </div>
            </div>

            {selectedTemplate?.id === template.id && (
              <div className="selected-badge">
                <i className="fas fa-check-circle"></i>
                Selected
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
