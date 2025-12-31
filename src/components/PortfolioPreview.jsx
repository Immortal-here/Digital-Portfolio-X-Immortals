
import React, { useState, useEffect } from "react";
import "../styles/PortfolioPreview.scss";

const PortfolioPreview = ({
  template,
  personalInfo,
  projects,
  education,
  experience,
  skills,
  settings,
}) => {
  const [previewMode, setPreviewMode] = useState("desktop");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getTemplateStyles = () => {
    if (!template) return {};

    return {
      "--primary-color": template.colors?.[0] || settings?.primaryColor || "#667eea",
      "--secondary-color": template.colors?.[1] || settings?.secondaryColor || "#764ba2",
      "--accent-color": template.colors?.[2] || settings?.accentColor || "#ff6b6b",
      "--text-color": settings?.textColor || "#333333",
      "--bg-color": settings?.backgroundColor || "#ffffff",
    };
  };

  const deviceSpecs = {
    desktop: { width: "100%", height: "auto", icon: "fa-desktop", label: "Desktop View" },
    tablet: { width: "768px", height: "1024px", icon: "fa-tablet-alt", label: "Tablet View" },
    mobile: { width: "375px", height: "667px", icon: "fa-mobile-alt", label: "Mobile View" }
  };

  const renderModernDeveloper = () => (
    <div className="template-modern-developer" style={getTemplateStyles()}>
      <div className="template-nav">
        <div className="nav-brand">
          <div className="brand-logo">
            {personalInfo?.name?.charAt(0) || "P"}
          </div>
          <span className="brand-name">{personalInfo?.name || "Portfolio"}</span>
        </div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="nav-cta">
          <button className="hire-btn">Hire Me</button>
        </div>
      </div>

      <section className="hero-section" id="about">
        <div className="hero-background">
          <div className="hero-pattern"></div>
          <div className="floating-elements">
            <div className="float-element fe-1"></div>
            <div className="float-element fe-2"></div>
            <div className="float-element fe-3"></div>
          </div>
        </div>
        
        <div className="hero-content">
          <div className="hero-avatar">
            {personalInfo?.avatar ? (
              <img src={personalInfo.avatar} alt={personalInfo.name} />
            ) : (
              <div className="avatar-placeholder">
                <i className="fas fa-user"></i>
              </div>
            )}
            <div className="avatar-ring"></div>
          </div>
          
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="greeting">Hi, I'm</span>
              <span className="name">{personalInfo?.name || "Your Name"}</span>
            </h1>
            <h2 className="hero-subtitle">
              {personalInfo?.title || "Professional Title"}
            </h2>
            <p className="hero-bio">
              {personalInfo?.bio || "Your professional bio will appear here. Tell the world about your expertise and passion."}
            </p>
            
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">{projects?.length || 0}</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{experience?.length || "2+"}</span>
                <span className="stat-label">Years Exp</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{skills?.length || 0}</span>
                <span className="stat-label">Skills</span>
              </div>
            </div>
            
            <div className="hero-actions">
              <button className="cta-primary">
                <i className="fas fa-download"></i>
                Download CV
              </button>
              <button className="cta-secondary">
                <i className="fas fa-envelope"></i>
                Get In Touch
              </button>
            </div>
          </div>
        </div>
        
        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <span>Scroll to explore</span>
        </div>
      </section>

      <section className="skills-section" id="skills">
        <div className="section-container">
          <div className="section-header">
            <span className="section-tag">Expertise</span>
            <h2 className="section-title">Skills & Technologies</h2>
            <p className="section-subtitle">
              Passionate about creating amazing digital experiences
            </p>
          </div>
          
          <div className="skills-showcase">
            {skills?.length > 0 ? (
              <div className="skills-grid">
                {skills.slice(0, 12).map((skill, index) => (
                  <div key={index} className="skill-card" style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="skill-icon">
                      <i className="fas fa-code"></i>
                    </div>
                    <span className="skill-name">{skill}</span>
                    <div className="skill-level">
                      <div className="level-bar" style={{width: `${Math.random() * 40 + 60}%`}}></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-showcase">
                <div className="empty-icon">
                  <i className="fas fa-tools"></i>
                </div>
                <h4>No Skills Added Yet</h4>
                <p>Add your skills to showcase your expertise</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="projects-section" id="projects">
        <div className="section-container">
          <div className="section-header">
            <span className="section-tag">Portfolio</span>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">
              Some of my most impactful work
            </p>
          </div>
          
          <div className="projects-showcase">
            {projects?.length > 0 ? (
              <div className="projects-grid">
                {projects.slice(0, 6).map((project, index) => (
                  <div key={index} className="project-card" style={{animationDelay: `${index * 0.2}s`}}>
                    <div className="project-image">
                      {project.image ? (
                        <img src={project.image} alt={project.title} />
                      ) : (
                        <div className="image-placeholder">
                          <i className="fas fa-code"></i>
                        </div>
                      )}
                      <div className="project-overlay">
                        <div className="overlay-content">
                          <div className="project-links">
                            {project.liveUrl && (
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                                <i className="fas fa-external-link-alt"></i>
                                <span>Live Demo</span>
                              </a>
                            )}
                            {project.githubUrl && (
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                                <i className="fab fa-github"></i>
                                <span>Source Code</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="project-content">
                      <div className="project-header">
                        <h3 className="project-title">{project.title}</h3>
                        {project.featured && (
                          <div className="featured-badge">
                            <i className="fas fa-star"></i>
                            <span>Featured</span>
                          </div>
                        )}
                      </div>
                      <p className="project-description">{project.description}</p>
                      <div className="project-tech">
                        {Array.isArray(project.technologies)
                          ? project.technologies.slice(0, 4).map((tech, i) => (
                              <span key={i} className="tech-tag">
                                {tech}
                              </span>
                            ))
                          : project.technologies
                              ?.split(",")
                              .slice(0, 4)
                              .map((tech, i) => (
                                <span key={i} className="tech-tag">
                                  {tech.trim()}
                                </span>
                              ))}
                        {Array.isArray(project.technologies) && project.technologies.length > 4 && (
                          <span className="tech-more">+{project.technologies.length - 4}</span>
                        )}
                      </div>
                      <div className="project-details">
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="detail-link">
                            <i className="fas fa-external-link-alt"></i>
                            View Project
                          </a>
                        )}
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="detail-link">
                            <i className="fab fa-github"></i>
                            View Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-showcase">
                <div className="empty-icon">
                  <i className="fas fa-folder-open"></i>
                </div>
                <h4>No Projects Added Yet</h4>
                <p>Add your projects to showcase your work</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {experience?.length > 0 && (
        <section className="experience-section" id="experience">
          <div className="section-container">
            <div className="section-header">
              <span className="section-tag">Career</span>
              <h2 className="section-title">Professional Experience</h2>
              <p className="section-subtitle">
                My professional journey and achievements
              </p>
            </div>
            
            <div className="experience-timeline">
              {experience.map((exp, index) => (
                <div key={index} className="timeline-item" style={{animationDelay: `${index * 0.2}s`}}>
                  <div className="timeline-marker">
                    <div className="marker-dot"></div>
                    <div className="marker-line"></div>
                  </div>
                  <div className="timeline-content">
                    <div className="experience-card">
                      <div className="experience-header">
                        <h3 className="position">{exp.position}</h3>
                        <div className="duration">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </div>
                      </div>
                      <h4 className="company">{exp.company}</h4>
                      <p className="description">{exp.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {education?.length > 0 && (
        <section className="education-section" id="education">
          <div className="section-container">
            <div className="section-header">
              <span className="section-tag">Learning</span>
              <h2 className="section-title">Education</h2>
              <p className="section-subtitle">
                Academic background and qualifications
              </p>
            </div>
            
            <div className="education-grid">
              {education.map((edu, index) => (
                <div key={index} className="education-card" style={{animationDelay: `${index * 0.2}s`}}>
                  <div className="education-icon">
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                  <div className="education-content">
                    <h3 className="degree">{edu.degree}</h3>
                    <h4 className="field">{edu.field}</h4>
                    <p className="institution">{edu.institution}</p>
                    <div className="duration">
                      {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="contact-section" id="contact">
        <div className="section-container">
          <div className="contact-content">
            <div className="contact-info">
              <h2>Let's Work Together</h2>
              <p>Ready to create something amazing? Let's discuss your next project.</p>
              
              <div className="contact-details">
                {personalInfo?.email && (
                  <div className="contact-item">
                    <i className="fas fa-envelope"></i>
                    <span>{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo?.phone && (
                  <div className="contact-item">
                    <i className="fas fa-phone"></i>
                    <span>{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo?.location && (
                  <div className="contact-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{personalInfo.location}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="contact-form">
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Your Name" />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Your Email" />
                </div>
                <div className="form-group">
                  <textarea placeholder="Your Message" rows="4"></textarea>
                </div>
                <button type="submit" className="submit-btn stylish">
                <span className="btn-icon" aria-hidden="true">
                <i className="fas fa-paper-plane"></i>
               </span>
              <span className="btn-text">Send Message</span>
              </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderTemplate = () => {
    if (!template) {
      return (
        <div className="no-template-selected">
          <div className="no-template-content">
            <div className="no-template-icon">
              <i className="fas fa-palette"></i>
            </div>
            <h3>Choose Your Template</h3>
            <p>Select a template from the first step to see your portfolio preview</p>
            <div className="template-features">
              <div className="feature-item">
                <i className="fas fa-mobile-alt"></i>
                <span>Responsive Design</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-rocket"></i>
                <span>Fast Loading</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-search"></i>
                <span>SEO Optimized</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return renderModernDeveloper();
  };

  return (
    <div className={`portfolio-preview-modern ${isFullscreen ? "fullscreen" : ""}`}>
      <div className="preview-header">
        <div className="preview-title">
          <h4>
            <i className="fas fa-eye"></i>
            Live Preview
          </h4>
          <span className="preview-subtitle">See how your portfolio looks</span>
        </div>
        
        <div className="preview-controls">
          <div className="device-selector">
            {Object.entries(deviceSpecs).map(([device, specs]) => (
              <button
                key={device}
                className={`device-btn ${previewMode === device ? "active" : ""}`}
                onClick={() => setPreviewMode(device)}
                title={specs.label}
              >
                <i className={`fas ${specs.icon}`}></i>
                <span className="device-label">{device}</span>
              </button>
            ))}
          </div>
          
          <div className="preview-actions">
            <button
              className="action-btn"
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              <i className={`fas fa-${isFullscreen ? "compress" : "expand"}`}></i>
            </button>
            <button
              className="action-btn"
              onClick={() => window.open("#", "_blank")}
              title="Open in New Tab"
            >
              <i className="fas fa-external-link-alt"></i>
            </button>
            <button
              className="action-btn"
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 1000);
              }}
              title="Refresh Preview"
            >
              <i className={`fas fa-sync-alt ${isLoading ? "fa-spin" : ""}`}></i>
            </button>
          </div>
        </div>
      </div>

      <div className="preview-viewport">
        <div className={`preview-frame ${previewMode}`}>
          <div className="frame-content" style={deviceSpecs[previewMode]}>
            <div className="browser-bar">
              <div className="browser-controls">
                <div className="control-dot red"></div>
                <div className="control-dot yellow"></div>
                <div className="control-dot green"></div>
              </div>
              <div className="address-bar">
                <i className="fas fa-lock"></i>
                <span>yourportfolio.com</span>
              </div>
              <div className="browser-actions">
                <i className="fas fa-bookmark"></i>
                <i className="fas fa-share"></i>
              </div>
            </div>
            
            <div className="template-content">
              {isLoading ? (
                <div className="loading-state">
                  <div className="loading-spinner"></div>
                  <span>Loading preview...</span>
                </div>
              ) : (
                renderTemplate()
              )}
            </div>
          </div>
        </div>
        
        <div className="preview-info">
          <div className="device-info">
            <i className={`fas ${deviceSpecs[previewMode].icon}`}></i>
            <span>{deviceSpecs[previewMode].label}</span>
          </div>
          <div className="resolution-info">
            {deviceSpecs[previewMode].width} × {deviceSpecs[previewMode].height || "auto"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPreview;
