// src/components/PortfolioBuilder.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import { toast } from "react-toastify";
import Navigation from "./Navigation";
import PortfolioPreview from "./PortfolioPreview";
import TemplateSelector from "./TemplateSelector";
import "../styles/PortfolioBuilder.scss";

const PortfolioBuilder = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [loading, setLoading] = useState(true);

  // Portfolio data
  const [template, setTemplate] = useState(null);
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    title: "",
    bio: "",
    email: "",
    phone: "",
    location: "",
    avatar: "",
  });
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [settings, setSettings] = useState({
    primaryColor: "#667eea",
    secondaryColor: "#764ba2",
    accentColor: "#3b82f6",
    textColor: "#333333",
    backgroundColor: "#ffffff",
  });

  // Temporary form states
  const [newSkill, setNewSkill] = useState("");
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: "",
    liveUrl: "",
    githubUrl: "",
    image: "",
    featured: false,
  });
  const [newExperience, setNewExperience] = useState({
    position: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  });
  const [newEducation, setNewEducation] = useState({
    degree: "",
    field: "",
    institution: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    grade: "",
  });

  // Load portfolio data on mount
  useEffect(() => {
    if (!authLoading && user) {
      loadPortfolio();
    }
  }, [user, authLoading]);

  const loadPortfolio = async () => {
    try {
      const portfolioRef = doc(db, "portfolios", user.uid);
      const portfolioSnap = await getDoc(portfolioRef);

      if (portfolioSnap.exists()) {
        const data = portfolioSnap.data();
        setTemplate(data.template || null);
        setPersonalInfo(data.personalInfo || {});
        setSkills(data.skills || []);
        setProjects(data.projects || []);
        setExperience(data.experience || []);
        setEducation(data.education || []);
        setSettings(data.settings || settings);
        setLastSaved(data.updatedAt);
      }
    } catch (error) {
      console.error("Error loading portfolio:", error);
      toast.error("Failed to load portfolio");
    } finally {
      setLoading(false);
    }
  };

  // Auto-save function
  const savePortfolio = async () => {
    if (!user) return;

    try {
      setIsSaving(true);
      const portfolioRef = doc(db, "portfolios", user.uid);
      
      const portfolioData = {
        template,
        personalInfo,
        skills,
        projects,
        experience,
        education,
        settings,
        updatedAt: new Date(),
      };

      const portfolioSnap = await getDoc(portfolioRef);
      
      if (portfolioSnap.exists()) {
        await updateDoc(portfolioRef, portfolioData);
      } else {
        await setDoc(portfolioRef, portfolioData);
      }

      setLastSaved(new Date());
      toast.success("Portfolio saved successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error saving portfolio:", error);
      toast.error("Failed to save portfolio");
    } finally {
      setIsSaving(false);
    }
  };

  // 👇 NEW FUNCTION: Handle Preview with Auto-Save
  const handlePreview = async () => {
    try {
      toast.info("Saving changes before preview...", {
        position: "bottom-right",
        autoClose: 1500,
      });

      await savePortfolio();
      await new Promise(resolve => setTimeout(resolve, 500));
      
      navigate("/preview");
      
      toast.success("Redirecting to preview!", {
        position: "bottom-right",
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error saving before preview:", error);
      toast.error("Failed to save. Please try again.");
    }
  };

  // Upload image to Firebase Storage
  const uploadImage = async (file, path) => {
    try {
      const storageRef = ref(storage, `${user.uid}/${path}/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
      return null;
    }
  };

  // Handle avatar upload
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be less than 2MB");
      return;
    }

    toast.info("Uploading avatar...");
    const url = await uploadImage(file, "avatars");
    
    if (url) {
      setPersonalInfo({ ...personalInfo, avatar: url });
      toast.success("Avatar uploaded!");
    }
  };

  // Handle project image upload
  const handleProjectImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    toast.info("Uploading project image...");
    const url = await uploadImage(file, "projects");
    
    if (url) {
      setNewProject({ ...newProject, image: url });
      toast.success("Image uploaded!");
    }
  };

  // Skills handlers
  const handleAddSkill = () => {
    if (!newSkill.trim()) {
      toast.warning("Please enter a skill name");
      return;
    }
    
    if (skills.includes(newSkill.trim())) {
      toast.warning("Skill already exists");
      return;
    }

    setSkills([...skills, newSkill.trim()]);
    setNewSkill("");
    toast.success("Skill added!");
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
    toast.info("Skill removed");
  };

  // Project handlers
  const handleAddProject = () => {
    if (!newProject.title.trim()) {
      toast.warning("Please enter project title");
      return;
    }

    setProjects([...projects, { ...newProject, id: Date.now() }]);
    setNewProject({
      title: "",
      description: "",
      technologies: "",
      liveUrl: "",
      githubUrl: "",
      image: "",
      featured: false,
    });
    toast.success("Project added!");
  };

  const handleRemoveProject = (projectId) => {
    setProjects(projects.filter((p) => p.id !== projectId));
    toast.info("Project removed");
  };

  // Experience handlers
  const handleAddExperience = () => {
    if (!newExperience.position.trim() || !newExperience.company.trim()) {
      toast.warning("Please enter position and company");
      return;
    }

    setExperience([...experience, { ...newExperience, id: Date.now() }]);
    setNewExperience({
      position: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });
    toast.success("Experience added!");
  };

  const handleRemoveExperience = (expId) => {
    setExperience(experience.filter((e) => e.id !== expId));
    toast.info("Experience removed");
  };

  // Education handlers
  const handleAddEducation = () => {
    if (!newEducation.degree.trim() || !newEducation.institution.trim()) {
      toast.warning("Please enter degree and institution");
      return;
    }

    setEducation([...education, { ...newEducation, id: Date.now() }]);
    setNewEducation({
      degree: "",
      field: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      grade: "",
    });
    toast.success("Education added!");
  };

  const handleRemoveEducation = (eduId) => {
    setEducation(education.filter((e) => e.id !== eduId));
    toast.info("Education removed");
  };

  // Step navigation
  const steps = [
    { id: 1, name: "Template", icon: "fa-palette" },
    { id: 2, name: "Personal Info", icon: "fa-user" },
    { id: 3, name: "Skills", icon: "fa-code" },
    { id: 4, name: "Projects", icon: "fa-briefcase" },
    { id: 5, name: "Experience", icon: "fa-building" },
    { id: 6, name: "Education", icon: "fa-graduation-cap" },
    { id: 7, name: "Styling", icon: "fa-paint-brush" },
  ];

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="builder-container">
        <Navigation />
        <div className="loading-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading Builder...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="builder-container">
      <Navigation />
      
      {/* Builder Header */}
      <div className="builder-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            <i className="fas fa-arrow-left"></i>
            <span>Back to Dashboard</span>
          </button>
          
          <div className="save-status">
            {isSaving ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                <span>Saving...</span>
              </>
            ) : lastSaved ? (
              <>
                <i className="fas fa-check-circle"></i>
                <span>Saved {formatTimeAgo(lastSaved)}</span>
              </>
            ) : (
              <>
                <i className="fas fa-cloud"></i>
                <span>Not saved</span>
              </>
            )}
          </div>
        </div>
        
        {/* 👇 UPDATED: Preview button now uses handlePreview */}
        <div className="header-actions">
          <button className="save-btn" onClick={savePortfolio} disabled={isSaving}>
            <i className="fas fa-save"></i>
            Save Portfolio
          </button>
          <button className="preview-btn" onClick={handlePreview} disabled={isSaving}>
            <i className="fas fa-eye"></i>
            Preview
          </button>
        </div>
      </div>

      <div className="builder-layout">
        {/* Left Sidebar - Steps */}
        <div className="builder-sidebar">
          <div className="sidebar-header">
            <h3>Portfolio Builder</h3>
            <p>Follow these steps</p>
          </div>
          
          <div className="steps-list">
            {steps.map((step) => (
              <button
                key={step.id}
                className={`step-item ${currentStep === step.id ? "active" : ""} ${
                  currentStep > step.id ? "completed" : ""
                }`}
                onClick={() => setCurrentStep(step.id)}
              >
                <div className="step-icon">
                  <i className={`fas ${step.icon}`}></i>
                </div>
                <div className="step-content">
                  <span className="step-number">Step {step.id}</span>
                  <span className="step-name">{step.name}</span>
                </div>
                {currentStep > step.id && (
                  <div className="step-check">
                    <i className="fas fa-check"></i>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="builder-main">
          <div className="main-content">
            {/* Step 1: Template Selection */}
            {currentStep === 1 && (
              <div className="step-content">
                <div className="step-header">
                  <h2>Choose Your Template</h2>
                  <p>Select a design that matches your style</p>
                </div>
                <TemplateSelector
                  selectedTemplate={template}
                  onSelectTemplate={(t) => {
                    setTemplate(t);
                    toast.success("Template selected!");
                  }}
                />
              </div>
            )}

            {/* Step 2: Personal Information */}
            {currentStep === 2 && (
              <div className="step-content">
                <div className="step-header">
                  <h2>Personal Information</h2>
                  <p>Tell us about yourself</p>
                </div>
                
                <div className="form-section">
                  <div className="avatar-upload">
                    <div className="avatar-preview">
                      {personalInfo.avatar ? (
                        <img src={personalInfo.avatar} alt="Avatar" />
                      ) : (
                        <div className="avatar-placeholder">
                          <i className="fas fa-user"></i>
                        </div>
                      )}
                    </div>
                    <label className="upload-btn">
                      <i className="fas fa-camera"></i>
                      Upload Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        hidden
                      />
                    </label>
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        value={personalInfo.name}
                        onChange={(e) =>
                          setPersonalInfo({ ...personalInfo, name: e.target.value })
                        }
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="form-group">
                      <label>Professional Title *</label>
                      <input
                        type="text"
                        value={personalInfo.title}
                        onChange={(e) =>
                          setPersonalInfo({ ...personalInfo, title: e.target.value })
                        }
                        placeholder="Full Stack Developer"
                      />
                    </div>

                    <div className="form-group full-width">
                      <label>Bio</label>
                      <textarea
                        value={personalInfo.bio}
                        onChange={(e) =>
                          setPersonalInfo({ ...personalInfo, bio: e.target.value })
                        }
                        placeholder="Tell your professional story..."
                        rows="4"
                      />
                    </div>

                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) =>
                          setPersonalInfo({ ...personalInfo, email: e.target.value })
                        }
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="tel"
                        value={personalInfo.phone}
                        onChange={(e) =>
                          setPersonalInfo({ ...personalInfo, phone: e.target.value })
                        }
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div className="form-group full-width">
                      <label>Location</label>
                      <input
                        type="text"
                        value={personalInfo.location}
                        onChange={(e) =>
                          setPersonalInfo({ ...personalInfo, location: e.target.value })
                        }
                        placeholder="San Francisco, CA"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Skills */}
            {currentStep === 3 && (
              <div className="step-content">
                <div className="step-header">
                  <h2>Your Skills</h2>
                  <p>Add your technical and professional skills</p>
                </div>
                
                <div className="form-section">
                  <div className="skills-input-group">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                      placeholder="e.g., JavaScript, React, Node.js"
                    />
                    <button className="add-btn" onClick={handleAddSkill}>
                      <i className="fas fa-plus"></i>
                      Add Skill
                    </button>
                  </div>

                  <div className="skills-list">
                    {skills.length > 0 ? (
                      skills.map((skill, index) => (
                        <div key={index} className="skill-tag">
                          <span>{skill}</span>
                          <button onClick={() => handleRemoveSkill(skill)}>
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="empty-state">
                        <i className="fas fa-code"></i>
                        <p>No skills added yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Projects */}
            {currentStep === 4 && (
              <div className="step-content">
                <div className="step-header">
                  <h2>Your Projects</h2>
                  <p>Showcase your best work</p>
                </div>
                
                <div className="form-section">
                  <div className="add-item-form">
                    <h3>Add New Project</h3>
                    
                    <div className="form-grid">
                      <div className="form-group full-width">
                        <label>Project Title *</label>
                        <input
                          type="text"
                          value={newProject.title}
                          onChange={(e) =>
                            setNewProject({ ...newProject, title: e.target.value })
                          }
                          placeholder="My Awesome Project"
                        />
                      </div>

                      <div className="form-group full-width">
                        <label>Description *</label>
                        <textarea
                          value={newProject.description}
                          onChange={(e) =>
                            setNewProject({ ...newProject, description: e.target.value })
                          }
                          placeholder="Describe your project..."
                          rows="3"
                        />
                      </div>

                      <div className="form-group">
                        <label>Technologies</label>
                        <input
                          type="text"
                          value={newProject.technologies}
                          onChange={(e) =>
                            setNewProject({ ...newProject, technologies: e.target.value })
                          }
                          placeholder="React, Node.js, MongoDB"
                        />
                      </div>

                      <div className="form-group">
                        <label>Live URL</label>
                        <input
                          type="url"
                          value={newProject.liveUrl}
                          onChange={(e) =>
                            setNewProject({ ...newProject, liveUrl: e.target.value })
                          }
                          placeholder="https://example.com"
                        />
                      </div>

                      <div className="form-group">
                        <label>GitHub URL</label>
                        <input
                          type="url"
                          value={newProject.githubUrl}
                          onChange={(e) =>
                            setNewProject({ ...newProject, githubUrl: e.target.value })
                          }
                          placeholder="https://github.com/user/repo"
                        />
                      </div>

                      <div className="form-group">
                        <label>Project Image</label>
                        <div className="image-upload">
                          <label className="upload-btn secondary">
                            <i className="fas fa-image"></i>
                            {newProject.image ? "Change Image" : "Upload Image"}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleProjectImageUpload}
                              hidden
                            />
                          </label>
                          {newProject.image && (
                            <div className="image-preview">
                              <img src={newProject.image} alt="Project" />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="form-group full-width">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={newProject.featured}
                            onChange={(e) =>
                              setNewProject({ ...newProject, featured: e.target.checked })
                            }
                          />
                          <span>Mark as Featured Project</span>
                        </label>
                      </div>
                    </div>

                    <button className="add-btn" onClick={handleAddProject}>
                      <i className="fas fa-plus"></i>
                      Add Project
                    </button>
                  </div>

                  <div className="items-list">
                    <h3>Added Projects ({projects.length})</h3>
                    {projects.length > 0 ? (
                      <div className="projects-grid">
                        {projects.map((project) => (
                          <div key={project.id} className="project-card">
                            {project.image && (
                              <div className="project-image">
                                <img src={project.image} alt={project.title} />
                              </div>
                            )}
                            <div className="project-content">
                              <h4>{project.title}</h4>
                              <p>{project.description}</p>
                              {project.featured && (
                                <span className="featured-badge">
                                  <i className="fas fa-star"></i> Featured
                                </span>
                              )}
                            </div>
                            <button
                              className="remove-btn"
                              onClick={() => handleRemoveProject(project.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="empty-state">
                        <i className="fas fa-briefcase"></i>
                        <p>No projects added yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Experience */}
            {currentStep === 5 && (
              <div className="step-content">
                <div className="step-header">
                  <h2>Work Experience</h2>
                  <p>Add your professional experience</p>
                </div>
                
                <div className="form-section">
                  <div className="add-item-form">
                    <h3>Add Work Experience</h3>
                    
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Position *</label>
                        <input
                          type="text"
                          value={newExperience.position}
                          onChange={(e) =>
                            setNewExperience({ ...newExperience, position: e.target.value })
                          }
                          placeholder="Senior Developer"
                        />
                      </div>

                      <div className="form-group">
                        <label>Company *</label>
                        <input
                          type="text"
                          value={newExperience.company}
                          onChange={(e) =>
                            setNewExperience({ ...newExperience, company: e.target.value })
                          }
                          placeholder="Tech Corp"
                        />
                      </div>

                      <div className="form-group">
                        <label>Location</label>
                        <input
                          type="text"
                          value={newExperience.location}
                          onChange={(e) =>
                            setNewExperience({ ...newExperience, location: e.target.value })
                          }
                          placeholder="New York, NY"
                        />
                      </div>

                      <div className="form-group">
                        <label>Start Date</label>
                        <input
                          type="month"
                          value={newExperience.startDate}
                          onChange={(e) =>
                            setNewExperience({ ...newExperience, startDate: e.target.value })
                          }
                        />
                      </div>

                      <div className="form-group">
                        <label>End Date</label>
                        <input
                          type="month"
                          value={newExperience.endDate}
                          onChange={(e) =>
                            setNewExperience({ ...newExperience, endDate: e.target.value })
                          }
                          disabled={newExperience.current}
                        />
                      </div>

                      <div className="form-group">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={newExperience.current}
                            onChange={(e) =>
                              setNewExperience({ ...newExperience, current: e.target.checked })
                            }
                          />
                          <span>I currently work here</span>
                        </label>
                      </div>

                      <div className="form-group full-width">
                        <label>Description</label>
                        <textarea
                          value={newExperience.description}
                          onChange={(e) =>
                            setNewExperience({ ...newExperience, description: e.target.value })
                          }
                          placeholder="Describe your role and achievements..."
                          rows="4"
                        />
                      </div>
                    </div>

                    <button className="add-btn" onClick={handleAddExperience}>
                      <i className="fas fa-plus"></i>
                      Add Experience
                    </button>
                  </div>

                  <div className="items-list">
                    <h3>Added Experience ({experience.length})</h3>
                    {experience.length > 0 ? (
                      <div className="timeline-list">
                        {experience.map((exp) => (
                          <div key={exp.id} className="timeline-item">
                            <div className="timeline-content">
                              <h4>{exp.position}</h4>
                              <p className="company">{exp.company}</p>
                              <p className="date">
                                {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                              </p>
                              <p className="description">{exp.description}</p>
                            </div>
                            <button
                              className="remove-btn"
                              onClick={() => handleRemoveExperience(exp.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="empty-state">
                        <i className="fas fa-building"></i>
                        <p>No experience added yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Education */}
            {currentStep === 6 && (
              <div className="step-content">
                <div className="step-header">
                  <h2>Education</h2>
                  <p>Add your educational background</p>
                </div>
                
                <div className="form-section">
                  <div className="add-item-form">
                    <h3>Add Education</h3>
                    
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Degree *</label>
                        <input
                          type="text"
                          value={newEducation.degree}
                          onChange={(e) =>
                            setNewEducation({ ...newEducation, degree: e.target.value })
                          }
                          placeholder="Bachelor of Science"
                        />
                      </div>

                      <div className="form-group">
                        <label>Field of Study</label>
                        <input
                          type="text"
                          value={newEducation.field}
                          onChange={(e) =>
                            setNewEducation({ ...newEducation, field: e.target.value })
                          }
                          placeholder="Computer Science"
                        />
                      </div>

                      <div className="form-group">
                        <label>Institution *</label>
                        <input
                          type="text"
                          value={newEducation.institution}
                          onChange={(e) =>
                            setNewEducation({ ...newEducation, institution: e.target.value })
                          }
                          placeholder="University Name"
                        />
                      </div>

                      <div className="form-group">
                        <label>Location</label>
                        <input
                          type="text"
                          value={newEducation.location}
                          onChange={(e) =>
                            setNewEducation({ ...newEducation, location: e.target.value })
                          }
                          placeholder="Boston, MA"
                        />
                      </div>

                      <div className="form-group">
                        <label>Start Date</label>
                        <input
                          type="month"
                          value={newEducation.startDate}
                          onChange={(e) =>
                            setNewEducation({ ...newEducation, startDate: e.target.value })
                          }
                        />
                      </div>

                      <div className="form-group">
                        <label>End Date</label>
                        <input
                          type="month"
                          value={newEducation.endDate}
                          onChange={(e) =>
                            setNewEducation({ ...newEducation, endDate: e.target.value })
                          }
                          disabled={newEducation.current}
                        />
                      </div>

                      <div className="form-group">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={newEducation.current}
                            onChange={(e) =>
                              setNewEducation({ ...newEducation, current: e.target.checked })
                            }
                          />
                          <span>Currently studying</span>
                        </label>
                      </div>

                      <div className="form-group">
                        <label>Grade/GPA</label>
                        <input
                          type="text"
                          value={newEducation.grade}
                          onChange={(e) =>
                            setNewEducation({ ...newEducation, grade: e.target.value })
                          }
                          placeholder="3.8/4.0"
                        />
                      </div>
                    </div>

                    <button className="add-btn" onClick={handleAddEducation}>
                      <i className="fas fa-plus"></i>
                      Add Education
                    </button>
                  </div>

                  <div className="items-list">
                    <h3>Added Education ({education.length})</h3>
                    {education.length > 0 ? (
                      <div className="education-list">
                        {education.map((edu) => (
                          <div key={edu.id} className="education-card">
                            <div className="edu-icon">
                              <i className="fas fa-graduation-cap"></i>
                            </div>
                            <div className="edu-content">
                              <h4>{edu.degree}</h4>
                              {edu.field && <p className="field">{edu.field}</p>}
                              <p className="institution">{edu.institution}</p>
                              <p className="date">
                                {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                              </p>
                              {edu.grade && <p className="grade">Grade: {edu.grade}</p>}
                            </div>
                            <button
                              className="remove-btn"
                              onClick={() => handleRemoveEducation(edu.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="empty-state">
                        <i className="fas fa-graduation-cap"></i>
                        <p>No education added yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 7: Styling Settings */}
            {currentStep === 7 && (
              <div className="step-content">
                <div className="step-header">
                  <h2>Customize Colors</h2>
                  <p>Choose your portfolio color scheme</p>
                </div>
                
                <div className="form-section">
                  <div className="color-picker-grid">
                    <div className="color-picker-group">
                      <label>Primary Color</label>
                      <div className="color-picker">
                        <input
                          type="color"
                          value={settings.primaryColor}
                          onChange={(e) =>
                            setSettings({ ...settings, primaryColor: e.target.value })
                          }
                        />
                        <span>{settings.primaryColor}</span>
                      </div>
                    </div>

                    <div className="color-picker-group">
                      <label>Secondary Color</label>
                      <div className="color-picker">
                        <input
                          type="color"
                          value={settings.secondaryColor}
                          onChange={(e) =>
                            setSettings({ ...settings, secondaryColor: e.target.value })
                          }
                        />
                        <span>{settings.secondaryColor}</span>
                      </div>
                    </div>

                    <div className="color-picker-group">
                      <label>Accent Color</label>
                      <div className="color-picker">
                        <input
                          type="color"
                          value={settings.accentColor}
                          onChange={(e) =>
                            setSettings({ ...settings, accentColor: e.target.value })
                          }
                        />
                        <span>{settings.accentColor}</span>
                      </div>
                    </div>

                    <div className="color-picker-group">
                      <label>Text Color</label>
                      <div className="color-picker">
                        <input
                          type="color"
                          value={settings.textColor}
                          onChange={(e) =>
                            setSettings({ ...settings, textColor: e.target.value })
                          }
                        />
                        <span>{settings.textColor}</span>
                      </div>
                    </div>

                    <div className="color-picker-group">
                      <label>Background Color</label>
                      <div className="color-picker">
                        <input
                          type="color"
                          value={settings.backgroundColor}
                          onChange={(e) =>
                            setSettings({ ...settings, backgroundColor: e.target.value })
                          }
                        />
                        <span>{settings.backgroundColor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="preset-colors">
                    <h4>Preset Themes</h4>
                    <div className="presets-grid">
                      <button
                        className="preset-btn"
                        onClick={() =>
                          setSettings({
                            primaryColor: "#667eea",
                            secondaryColor: "#764ba2",
                            accentColor: "#3b82f6",
                            textColor: "#333333",
                            backgroundColor: "#ffffff",
                          })
                        }
                      >
                        <div className="preset-colors-preview">
                          <span style={{ background: "#667eea" }}></span>
                          <span style={{ background: "#764ba2" }}></span>
                          <span style={{ background: "#3b82f6" }}></span>
                        </div>
                        <span>Default</span>
                      </button>

                      <button
                        className="preset-btn"
                        onClick={() =>
                          setSettings({
                            primaryColor: "#10b981",
                            secondaryColor: "#059669",
                            accentColor: "#34d399",
                            textColor: "#1f2937",
                            backgroundColor: "#f9fafb",
                          })
                        }
                      >
                        <div className="preset-colors-preview">
                          <span style={{ background: "#10b981" }}></span>
                          <span style={{ background: "#059669" }}></span>
                          <span style={{ background: "#34d399" }}></span>
                        </div>
                        <span>Green</span>
                      </button>

                      <button
                        className="preset-btn"
                        onClick={() =>
                          setSettings({
                            primaryColor: "#f59e0b",
                            secondaryColor: "#d97706",
                            accentColor: "#fbbf24",
                            textColor: "#1f2937",
                            backgroundColor: "#fffbeb",
                          })
                        }
                      >
                        <div className="preset-colors-preview">
                          <span style={{ background: "#f59e0b" }}></span>
                          <span style={{ background: "#d97706" }}></span>
                          <span style={{ background: "#fbbf24" }}></span>
                        </div>
                        <span>Orange</span>
                      </button>

                      <button
                        className="preset-btn"
                        onClick={() =>
                          setSettings({
                            primaryColor: "#8b5cf6",
                            secondaryColor: "#7c3aed",
                            accentColor: "#a78bfa",
                            textColor: "#1f2937",
                            backgroundColor: "#faf5ff",
                          })
                        }
                      >
                        <div className="preset-colors-preview">
                          <span style={{ background: "#8b5cf6" }}></span>
                          <span style={{ background: "#7c3aed" }}></span>
                          <span style={{ background: "#a78bfa" }}></span>
                        </div>
                        <span>Purple</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="step-navigation">
              {currentStep > 1 && (
                <button className="nav-btn prev" onClick={prevStep}>
                  <i className="fas fa-arrow-left"></i>
                  Previous
                </button>
              )}
              {currentStep < steps.length ? (
                <button className="nav-btn next" onClick={nextStep}>
                  Next
                  <i className="fas fa-arrow-right"></i>
                </button>
              ) : (
                <button className="nav-btn finish" onClick={savePortfolio}>
                  <i className="fas fa-check"></i>
                  Save & Finish
                </button>
              )}
            </div>
          </div>
        </div>

      
      </div>
    </div>
  );
};

// Helper function to format time ago
const formatTimeAgo = (date) => {
  if (!date) return "";
  
  try {
    const timestamp = date.toDate ? date.toDate() : new Date(date);
    const seconds = Math.floor((new Date() - timestamp) / 1000);
    
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  } catch (e) {
    return "";
  }
};

export default PortfolioBuilder;
