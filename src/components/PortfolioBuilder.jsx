import React, { useState, useEffect } from "react";
import axios from "axios";
import TemplateSelector from "./TemplateSelector";
import PortfolioPreview from "./PortfolioPreview";
import "../styles/PortfolioBuilder.scss";

const PortfolioBuilder = () => {
  const [currentStep, setCurrentStep] = useState("template");
  const [portfolioData, setPortfolioData] = useState({
    template: null,
    personalInfo: {
      name: "",
      title: "",
      bio: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      avatar: "",
    },
    skills: [],
    projects: [],
    experience: [],
    education: [],
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");
  const [saveStatus, setSaveStatus] = useState("saved");
  const [newSkill, setNewSkill] = useState("");
  const [portfolioId, setPortfolioId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: "",
    liveUrl: "",
    githubUrl: "",
    image: "",
    featured: false,
  });

  // Load user and portfolio on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));
    if (user && user.id) {
      setUserId(user.id);
      loadPortfolio(user.id);
    }
  }, []);

  // Load existing portfolio data
  const loadPortfolio = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/portfolio/user/${userId}`);
      if (response.data) {
        setPortfolioData(response.data);
        setPortfolioId(response.data._id);
      }
    } catch (error) {
      console.error('Error loading portfolio:', error);
    }
  };

  // Auto-save functionality
  useEffect(() => {
    if (!userId) return;

    const timer = setTimeout(() => {
      if (portfolioId) {
        updatePortfolio();
      } else if (portfolioData.template) {
        createPortfolio();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [portfolioData]);

  // Create new portfolio
  const createPortfolio = async () => {
    if (!userId || !portfolioData.template) return;

    setSaveStatus("saving");
    try {
      const response = await axios.post('http://localhost:5000/api/portfolio', {
        userId,
        template: portfolioData.template
      });
      setPortfolioId(response.data._id);
      setSaveStatus("saved");
    } catch (error) {
      console.error('Error creating portfolio:', error);
      setSaveStatus("error");
    }
  };

  // Update existing portfolio
  const updatePortfolio = async () => {
    if (!portfolioId) return;

    setSaveStatus("saving");
    try {
      await axios.put(`http://localhost:5000/api/portfolio/${portfolioId}`, portfolioData);
      setSaveStatus("saved");
    } catch (error) {
      console.error('Error updating portfolio:', error);
      setSaveStatus("error");
    }
  };

  const steps = [
    { id: "template", label: "Choose Template", icon: "fa-palette", desc: "Select your design" },
    { id: "content", label: "Add Content", icon: "fa-edit", desc: "Fill your information" },
    { id: "customize", label: "Customize", icon: "fa-cog", desc: "Style your portfolio" },
    { id: "publish", label: "Publish", icon: "fa-rocket", desc: "Go live" },
  ];

  const setSelectedTemplate = (template) => {
    setPortfolioData(prev => ({
      ...prev,
      template: template
    }));
  };

  const updatePortfolioData = (section, data) => {
    setPortfolioData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
    setSaveStatus("saving");
  };

  const addArrayItem = (section, item) => {
    setPortfolioData((prev) => ({
      ...prev,
      [section]: [...prev[section], { ...item, id: Date.now() }],
    }));
    setSaveStatus("saving");
  };

  const deleteArrayItem = (section, id) => {
    setPortfolioData((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== id),
    }));
    setSaveStatus("saving");
  };

  const renderStepIndicator = () => (
    <div className="step-wizard">
      <div className="step-progress-line"></div>
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={`step-item ${currentStep === step.id ? "active" : ""} ${
            steps.findIndex((s) => s.id === currentStep) > index
              ? "completed"
              : ""
          }`}
          onClick={() => setCurrentStep(step.id)}
        >
          <div className="step-circle">
            <i className={`fas ${step.icon}`}></i>
            <div className="step-pulse"></div>
          </div>
          <div className="step-info">
            <span className="step-title">{step.label}</span>
            <span className="step-desc">{step.desc}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderProfileForm = () => (
    <div className="form-container">
      <div className="form-header">
        <div className="form-icon">
          <i className="fas fa-user"></i>
        </div>
        <div className="form-title">
          <h3>Personal Information</h3>
          <p>Tell us about yourself to create an amazing portfolio</p>
        </div>
      </div>

      <div className="form-content">
        <div className="avatar-section">
          <div className="avatar-upload">
            {portfolioData.personalInfo.avatar ? (
              <img src={portfolioData.personalInfo.avatar} alt="Avatar" />
            ) : (
              <div className="avatar-placeholder">
                <i className="fas fa-camera"></i>
                <span>Upload Photo</span>
              </div>
            )}
            
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    updatePortfolioData("personalInfo", { avatar: e.target.result });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>
        </div>

        <div className="form-grid">
          <div className="input-group">
            <label>Full Name *</label>
            <div className="input-wrapper">
              <i className="fas fa-user"></i>
              <input
                type="text"
                value={portfolioData.personalInfo.name}
                onChange={(e) =>
                  updatePortfolioData("personalInfo", { name: e.target.value })
                }
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Professional Title *</label>
            <div className="input-wrapper">
              <i className="fas fa-briefcase"></i>
              <input
                type="text"
                value={portfolioData.personalInfo.title}
                onChange={(e) =>
                  updatePortfolioData("personalInfo", { title: e.target.value })
                }
                placeholder="e.g. Full Stack Developer"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Email Address *</label>
            <div className="input-wrapper">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                value={portfolioData.personalInfo.email}
                onChange={(e) =>
                  updatePortfolioData("personalInfo", { email: e.target.value })
                }
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <div className="input-wrapper">
              <i className="fas fa-phone"></i>
              <input
                type="tel"
                value={portfolioData.personalInfo.phone}
                onChange={(e) =>
                  updatePortfolioData("personalInfo", { phone: e.target.value })
                }
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div className="input-group">
            <label>Location</label>
            <div className="input-wrapper">
              <i className="fas fa-map-marker-alt"></i>
              <input
                type="text"
                value={portfolioData.personalInfo.location}
                onChange={(e) =>
                  updatePortfolioData("personalInfo", { location: e.target.value })
                }
                placeholder="City, Country"
              />
            </div>
          </div>

          <div className="input-group">
            <label>Website</label>
            <div className="input-wrapper">
              <i className="fas fa-globe"></i>
              <input
                type="url"
                value={portfolioData.personalInfo.website}
                onChange={(e) =>
                  updatePortfolioData("personalInfo", { website: e.target.value })
                }
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>
        </div>

        <div className="input-group full-width">
          <label>Professional Bio *</label>
          <div className="textarea-wrapper">
            <i className="fas fa-align-left"></i>
            <textarea
              value={portfolioData.personalInfo.bio}
              onChange={(e) =>
                updatePortfolioData("personalInfo", { bio: e.target.value })
              }
              placeholder="Write a compelling bio that showcases your expertise, passion, and what makes you unique in your field..."
              rows="4"
              required
            />
            <div className="char-count">
              {portfolioData.personalInfo.bio.length}/500
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProjectsForm = () => {
    const addProject = () => {
      if (newProject.title && newProject.description) {
        addArrayItem("projects", {
          ...newProject,
          technologies: newProject.technologies
            .split(",")
            .map((tech) => tech.trim()),
        });
        setNewProject({
          title: "",
          description: "",
          technologies: "",
          liveUrl: "",
          githubUrl: "",
          image: "",
          featured: false,
        });
      }
    };

    return (
      <div className="form-container">
        <div className="form-header">
          <div className="form-icon">
            <i className="fas fa-code"></i>
          </div>
          <div className="form-title">
            <h3>Projects & Portfolio</h3>
            <p>Showcase your best work and achievements</p>
          </div>
        </div>

        <div className="add-project-card">
          <h4><i className="fas fa-plus-circle"></i> Add New Project</h4>
          
          <div className="form-grid">
            <div className="input-group">
              <label>Project Title *</label>
              <div className="input-wrapper">
                <i className="fas fa-project-diagram"></i>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) =>
                    setNewProject({ ...newProject, title: e.target.value })
                  }
                  placeholder="E-commerce Platform"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Technologies Used</label>
              <div className="input-wrapper">
                <i className="fas fa-cogs"></i>
                <input
                  type="text"
                  value={newProject.technologies}
                  onChange={(e) =>
                    setNewProject({ ...newProject, technologies: e.target.value })
                  }
                  placeholder="React, Node.js, MongoDB (comma separated)"
                />
              </div>
            </div>

            <div className="input-group">
              <label>Live Demo URL</label>
              <div className="input-wrapper">
                <i className="fas fa-external-link-alt"></i>
                <input
                  type="url"
                  value={newProject.liveUrl}
                  onChange={(e) =>
                    setNewProject({ ...newProject, liveUrl: e.target.value })
                  }
                  placeholder="https://project-demo.com"
                />
              </div>
            </div>

            <div className="input-group">
              <label>GitHub Repository</label>
              <div className="input-wrapper">
                <i className="fab fa-github"></i>
                <input
                  type="url"
                  value={newProject.githubUrl}
                  onChange={(e) =>
                    setNewProject({ ...newProject, githubUrl: e.target.value })
                  }
                  placeholder="https://github.com/user/project"
                />
              </div>
            </div>
          </div>

          <div className="input-group full-width">
            <label>Project Description *</label>
            <div className="textarea-wrapper">
              <i className="fas fa-align-left"></i>
              <textarea
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
                placeholder="Describe the project, your role, challenges solved, and impact created..."
                rows="3"
                required
              />
            </div>
          </div>

          <div className="checkbox-group">
            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={newProject.featured}
                onChange={(e) =>
                  setNewProject({ ...newProject, featured: e.target.checked })
                }
              />
              <span className="checkmark"></span>
              <span className="checkbox-text">
                <strong>Featured Project</strong>
                <small>Highlight this project in your portfolio</small>
              </span>
            </label>
          </div>

          <button onClick={addProject} className="add-project-btn">
            <i className="fas fa-plus"></i>
            Add Project
          </button>
        </div>

        <div className="projects-list">
          <div className="list-header">
            <h4>Your Projects ({portfolioData.projects.length})</h4>
            {portfolioData.projects.length > 0 && (
              <div className="list-stats">
                <span className="featured-count">
                  {portfolioData.projects.filter(p => p.featured).length} Featured
                </span>
              </div>
            )}
          </div>
          
          {portfolioData.projects.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <i className="fas fa-folder-open"></i>
              </div>
              <h5>No projects added yet</h5>
              <p>Add your first project to showcase your work</p>
            </div>
          ) : (
            <div className="projects-grid">
              {portfolioData.projects.map((project) => (
                <div key={project.id} className={`project-card ${project.featured ? 'featured' : ''}`}>
                  {project.featured && (
                    <div className="featured-badge">
                      <i className="fas fa-star"></i>
                      Featured
                    </div>
                  )}
                  
                  <div className="project-header">
                    <h5>{project.title}</h5>
                    <button
                      onClick={() => deleteArrayItem("projects", project.id)}
                      className="delete-btn"
                      title="Delete Project"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                  
                  <p className="project-desc">{project.description}</p>
                  
                  <div className="project-tech">
                    {Array.isArray(project.technologies)
                      ? project.technologies.slice(0, 3).map((tech, index) => (
                          <span key={index} className="tech-tag">
                            {tech}
                          </span>
                        ))
                      : project.technologies
                          ?.split(",")
                          .slice(0, 3)
                          .map((tech, index) => (
                            <span key={index} className="tech-tag">
                              {tech.trim()}
                            </span>
                          ))}
                    {Array.isArray(project.technologies) && project.technologies.length > 3 && (
                      <span className="tech-more">+{project.technologies.length - 3} more</span>
                    )}
                  </div>
                  
                  <div className="project-links">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                        <i className="fas fa-external-link-alt"></i>
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                        <i className="fab fa-github"></i>
                        Code
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSkillsForm = () => {
    const addSkill = () => {
      if (newSkill.trim() && !portfolioData.skills.includes(newSkill.trim())) {
        setPortfolioData((prev) => ({
          ...prev,
          skills: [...prev.skills, newSkill.trim()],
        }));
        setNewSkill("");
        setSaveStatus("saving");
      }
    };

    const removeSkill = (skillToRemove) => {
      setPortfolioData((prev) => ({
        ...prev,
        skills: prev.skills.filter((skill) => skill !== skillToRemove),
      }));
      setSaveStatus("saving");
    };

    const skillCategories = [
      { name: "Programming", icon: "fa-code", suggestions: ["JavaScript", "Python", "React", "Node.js"] },
      { name: "Design", icon: "fa-paint-brush", suggestions: ["Photoshop", "Figma", "Illustrator", "UI/UX"] },
      { name: "Marketing", icon: "fa-bullhorn", suggestions: ["SEO", "Content Marketing", "Analytics", "Social Media"] },
      { name: "Other", icon: "fa-plus", suggestions: ["Communication", "Leadership", "Project Management"] }
    ];

    return (
      <div className="form-container">
        <div className="form-header">
          <div className="form-icon">
            <i className="fas fa-cogs"></i>
          </div>
          <div className="form-title">
            <h3>Skills & Expertise</h3>
            <p>Showcase your technical and professional skills</p>
          </div>
        </div>

        <div className="skills-input-section">
          <div className="skill-input-group">
            <div className="input-wrapper">
              <i className="fas fa-plus"></i>
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill (e.g., JavaScript, Photoshop, Marketing)"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addSkill())
                }
              />
            </div>
            <button onClick={addSkill} className="add-skill-btn">
              <i className="fas fa-plus"></i>
              Add Skill
            </button>
          </div>

          <div className="skill-suggestions">
            <h5>Popular Skills</h5>
            <div className="suggestions-grid">
              {skillCategories.map((category) => (
                <div key={category.name} className="suggestion-category">
                  <h6>
                    <i className={`fas ${category.icon}`}></i>
                    {category.name}
                  </h6>
                  <div className="suggestion-tags">
                    {category.suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        className="suggestion-tag"
                        onClick={() => {
                          if (!portfolioData.skills.includes(suggestion)) {
                            setPortfolioData((prev) => ({
                              ...prev,
                              skills: [...prev.skills, suggestion],
                            }));
                            setSaveStatus("saving");
                          }
                        }}
                        disabled={portfolioData.skills.includes(suggestion)}
                      >
                        {suggestion}
                        {portfolioData.skills.includes(suggestion) && (
                          <i className="fas fa-check"></i>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="skills-display">
          <div className="skills-header">
            <h5>Your Skills ({portfolioData.skills.length})</h5>
            {portfolioData.skills.length > 0 && (
              <button 
                className="clear-all-btn"
                onClick={() => {
                  setPortfolioData(prev => ({ ...prev, skills: [] }));
                  setSaveStatus("saving");
                }}
              >
                <i className="fas fa-trash"></i>
                Clear All
              </button>
            )}
          </div>
          
          {portfolioData.skills.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <i className="fas fa-tools"></i>
              </div>
              <h5>No skills added yet</h5>
              <p>Add skills to showcase your expertise</p>
            </div>
          ) : (
            <div className="skills-cloud">
              {portfolioData.skills.map((skill, index) => (
                <div key={index} className="skill-badge">
                  <span className="skill-name">{skill}</span>
                  <button
                    onClick={() => removeSkill(skill)}
                    className="skill-remove"
                    title="Remove skill"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderContentStep = () => (
    <div className="content-builder">
      <div className="content-sidebar">
        <div className="sidebar-header">
          <h3>Portfolio Sections</h3>
          <div className="progress-indicator">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ 
                  width: `${(Object.values({
                    personal: portfolioData.personalInfo.name && portfolioData.personalInfo.email,
                    projects: portfolioData.projects.length > 0,
                    skills: portfolioData.skills.length > 0
                  }).filter(Boolean).length / 3) * 100}%` 
                }}
              ></div>
            </div>
            <span className="progress-text">
              {Object.values({
                personal: portfolioData.personalInfo.name && portfolioData.personalInfo.email,
                projects: portfolioData.projects.length > 0,
                skills: portfolioData.skills.length > 0
              }).filter(Boolean).length}/3 sections completed
            </span>
          </div>
        </div>

        <div className="section-navigation">
          {[
            {
              id: "personal",
              label: "Personal Info",
              icon: "fa-user",
              completed: portfolioData.personalInfo.name && portfolioData.personalInfo.email,
              count: Object.values(portfolioData.personalInfo).filter(v => v && v.trim()).length
            },
            {
              id: "projects",
              label: "Projects",
              icon: "fa-code",
              completed: portfolioData.projects.length > 0,
              count: portfolioData.projects.length
            },
            {
              id: "skills",
              label: "Skills",
              icon: "fa-cogs",
              completed: portfolioData.skills.length > 0,
              count: portfolioData.skills.length
            }
          ].map((section) => (
            <button
              key={section.id}
              className={`nav-section ${activeSection === section.id ? "active" : ""} ${section.completed ? "completed" : ""}`}
              onClick={() => setActiveSection(section.id)}
            >
              <div className="section-icon">
                <i className={`fas ${section.icon}`}></i>
                {section.completed && (
                  <div className="completion-badge">
                    <i className="fas fa-check"></i>
                  </div>
                )}
              </div>
              <div className="section-details">
                <span className="section-name">{section.label}</span>
                <span className="section-count">
                  {section.count} {section.id === 'personal' ? 'fields' : 'items'}
                </span>
              </div>
              <i className="fas fa-chevron-right"></i>
            </button>
          ))}
        </div>

        <div className="save-indicator">
          <div className={`save-status ${saveStatus}`}>
            <div className="status-icon">
              {saveStatus === "saving" && <i className="fas fa-spinner fa-spin"></i>}
              {saveStatus === "saved" && <i className="fas fa-check-circle"></i>}
              {saveStatus === "error" && <i className="fas fa-exclamation-triangle"></i>}
            </div>
            <div className="status-text">
              {saveStatus === "saving" && "Saving changes..."}
              {saveStatus === "saved" && "All changes saved"}
              {saveStatus === "error" && "Error saving"}
            </div>
          </div>
        </div>
      </div>

      <div className="content-main">
        <div className="content-wrapper">
          {activeSection === "personal" && renderProfileForm()}
          {activeSection === "projects" && renderProjectsForm()}
          {activeSection === "skills" && renderSkillsForm()}
        </div>
      </div>
    </div>
  );

const exportPortfolio = () => {
  try {
    // Create formatted JSON data with proper spacing
    const dataStr = JSON.stringify(
      {
        meta: {
          exportedAt: new Date().toISOString(),
          version: "1.0",
          template: portfolioData.template?.name || "Custom"
        },
        ...portfolioData
      }, 
      null, 
      2
    );

    // Create download link
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const fileName = `portfolio_${portfolioData.personalInfo.name?.replace(/\s+/g, '_') || 'my'}_${new Date().toISOString().split('T')[0]}.json`;
    
    // Trigger download
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', fileName);
    linkElement.style.display = 'none';
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);

    // Show success feedback
    setSaveStatus("saved");
    return true;
  } catch (error) {
    console.error('Export failed:', error);
    setSaveStatus("error");
    return false;
  }
};

  const downloadAsHTML = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${portfolioData.personalInfo.name || 'My Portfolio'}</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
          }
          header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 0;
            border-bottom: 1px solid #eee;
            margin-bottom: 40px;
          }
          .hero {
            text-align: center;
            padding: 60px 20px;
          }
          .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 30px;
            margin: 40px 0;
          }
          .project-card {
            border: 1px solid #eee;
            border-radius: 8px;
            padding: 20px;
            transition: transform 0.3s ease;
          }
          .project-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          }
          .skills-cloud {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin: 20px 0;
          }
          .skill-tag {
            background: #f0f0f0;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <header>
          <h1>${portfolioData.personalInfo.name || 'My Portfolio'}</h1>
          <nav>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <section class="hero">
          <h2>${portfolioData.personalInfo.title || 'Professional Title'}</h2>
          <p>${portfolioData.personalInfo.bio || 'Professional bio'}</p>
        </section>

        ${portfolioData.projects.length > 0 ? `
        <section id="projects">
          <h2>My Projects</h2>
          <div class="projects-grid">
            ${portfolioData.projects.map(project => `
              <div class="project-card">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                ${project.technologies && project.technologies.length > 0 ? `
                <div class="project-tech">
                  ${project.technologies.map(tech => `
                    <span class="tech-tag">${tech}</span>
                  `).join('')}
                </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </section>
        ` : ''}

        ${portfolioData.skills.length > 0 ? `
        <section id="skills">
          <h2>My Skills</h2>
          <div class="skills-cloud">
            ${portfolioData.skills.map(skill => `
              <span class="skill-tag">${skill}</span>
            `).join('')}
          </div>
        </section>
        ` : ''}

        <footer id="contact">
          <h2>Contact Me</h2>
          <p>Email: ${portfolioData.personalInfo.email || 'your@email.com'}</p>
          ${portfolioData.personalInfo.website ? `
          <p>Website: <a href="${portfolioData.personalInfo.website}">${portfolioData.personalInfo.website}</a></p>
          ` : ''}
        </footer>
      </body>
      </html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-${portfolioData.personalInfo.name || 'my'}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

 const renderExportOptions = () => (
  <div className="export-section">
    <div className="section-header">
      <div className="section-icon">
        <i className="fas fa-cloud-download-alt"></i>
      </div>
      <div className="section-title">
        <h3>Export Portfolio</h3>
        <p>Download your portfolio for backup or sharing</p>
      </div>
    </div>

    <div className="export-cards">
      <div className="export-card">
        <div className="card-icon">
          <i className="fas fa-file-export"></i>
        </div>
        <h4>JSON Export</h4>
        <p>Full portfolio data including all sections and settings</p>
        <button 
          onClick={exportPortfolio} 
          className="btn-primary"
          disabled={saveStatus === "saving"}
        >
          {saveStatus === "saving" ? (
            <>
              <i className="fas fa-spinner fa-spin"></i> Processing...
            </>
          ) : (
            <>
              <i className="fas fa-download"></i> Export JSON
            </>
          )}
        </button>
        <div className="file-info">
          <i className="fas fa-info-circle"></i> Can be imported back later
        </div>
      </div>

      <div className="export-card">
        <div className="card-icon">
          <i className="fas fa-file-code"></i>
        </div>
        <h4>HTML Website</h4>
        <p>Complete portfolio as standalone HTML file</p>
        <button 
          onClick={downloadAsHTML} 
          className="btn-primary"
          disabled={saveStatus === "saving"}
        >
          {saveStatus === "saving" ? (
            <>
              <i className="fas fa-spinner fa-spin"></i> Processing...
            </>
          ) : (
            <>
              <i className="fas fa-download"></i> Download HTML
            </>
          )}
        </button>
        <div className="file-info">
          <i className="fas fa-info-circle"></i> Ready to upload to any web host
        </div>
      </div>
    </div>

    <div className="export-notice">
      <i className="fas fa-exclamation-triangle"></i>
      <span>Exported files may not include some template-specific styling</span>
    </div>
  </div>
);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "template":
        return (
          <TemplateSelector
            onTemplateSelect={setSelectedTemplate}
            selectedTemplate={portfolioData.template}
          />
        );
      case "content":
        return renderContentStep();
      case "customize":
        return (
          <div className="coming-soon">
            <div className="coming-soon-content">
              <i className="fas fa-paint-brush"></i>
              <h3>Customization Panel</h3>
              <p>Advanced styling options coming soon</p>
            </div>
          </div>
        );
      case "publish":
        return (
          <div className="publish-step">
            <div className="publish-content">
              <i className="fas fa-rocket"></i>
              <h3>Your Portfolio is Ready!</h3>
              <p>Export or publish your portfolio to share it with the world</p>
              {renderExportOptions()}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="portfolio-builder-modern">
      <div className="builder-header">
        <div className="header-content">
          <div className="header-text">
            <h1>
              <span className="gradient-text">Portfolio Builder</span>
              <i className="fas fa-magic"></i>
            </h1>
            <p>Create your professional portfolio in minutes with our intuitive builder</p>
          </div>
          
          <div className="header-actions">
            <button 
              className="preview-toggle"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
            >
              <i className={`fas fa-${isPreviewMode ? 'edit' : 'eye'}`}></i>
              {isPreviewMode ? 'Edit Mode' : 'Preview Mode'}
            </button>
          </div>
        </div>
        
        {renderStepIndicator()}
      </div>

      <div className="builder-workspace">
        <div className="workspace-main">
          <div className="main-content">
            {renderCurrentStep()}
          </div>
        </div>

        <div className="workspace-preview">
          <div className="preview-container">
            <PortfolioPreview
              template={portfolioData.template}
              personalInfo={portfolioData.personalInfo}
              skills={portfolioData.skills}
              projects={portfolioData.projects}
              experience={portfolioData.experience}
              education={portfolioData.education}
            />
          </div>
        </div>
      </div>

      <div className="builder-footer">
        <div className="footer-content">
          <button
            className="nav-btn prev-btn"
            onClick={() => {
              const currentIndex = steps.findIndex((s) => s.id === currentStep);
              if (currentIndex > 0) {
                setCurrentStep(steps[currentIndex - 1].id);
              }
            }}
            disabled={currentStep === "template"}
          >
            <i className="fas fa-arrow-left"></i>
            Previous Step
          </button>

          <div className="step-info">
            <span className="current-step">
              Step {steps.findIndex(s => s.id === currentStep) + 1} of {steps.length}
            </span>
          </div>

          <button
            className="nav-btn next-btn"
            onClick={() => {
              const currentIndex = steps.findIndex((s) => s.id === currentStep);
              if (currentIndex < steps.length - 1) {
                setCurrentStep(steps[currentIndex + 1].id);
              }
            }}
            disabled={currentStep === "publish"}
          >
            Next Step
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioBuilder;