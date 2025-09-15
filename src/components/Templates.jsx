import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Templates = () => {
  const templates = [
    {
      id: 1,
      name: "Modern Developer",
      category: "Developer · Portfolio",
      image:
        "/Images/ModernDeveloper.jpg",
      description: "Clean and modern design perfect for developers",
    },
    {
      id: 2,
      name: "Creative Artist",
      category: "Creative · Portfolio",
      image:
        "/Images/Creative Artist.jpg",
      description: "Artistic layout for creative professionals",
    },
    {
      id: 3,
      name: "Business Professional",
      category: "Business · Corporate",
      image:
        "/Images/Bussiness .jpg",
      description: "Professional design for business consultants",
    },
    {
      id: 4,
      name: "Photographer",
      category: "Photography · Visual",
      image:
        "/Images/photograph.jpg",
      description: "Image-focused layout for photographers",
    },
    {
      id: 5,
      name: "Designer Portfolio",
      category: "Design · Creative",
      image: "/Images/Designer.jpg",
      description: "Elegant design showcase for designers",
    },
    {
      id: 6,
      name: "Minimal Portfolio",
      category: "Minimal · Clean",
      image:
        "/Images/minimal.jpg",
      description: "Clean minimal design for any profession",
    },
  ];

  return (
    <div className="templates-container">
      <Navigation />

      <div className="container my-5 template-gallery">
        <div className="template-header">
          <h1>Choose Your Perfect Template</h1>
          <p>
            Select from our collection of professionally designed portfolio
            templates
          </p>
        </div>

        <div className="row g-4 justify-content-center template-grid">
          {templates.map((template) => (
            <div key={template.id} className="col-12 col-sm-6 col-md-4">
              <div className="template-card">
                <img src={template.image} alt={template.name} />
                <div className="template-content">
                  <h3>{template.name}</h3>
                  <p className="template-category">{template.category}</p>
                  <p className="template-description">{template.description}</p>
                  <button className="template-btn">Use This Template</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="template-footer">
          <p>
            Can't find what you're looking for?
            <a href="/contact">Contact us for custom designs</a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Templates;
