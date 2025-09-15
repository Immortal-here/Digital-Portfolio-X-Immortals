import jsPDF from "jspdf"; // run: npm install jspdf
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PortfolioBuilder from './PortfolioBuilder';
import '../styles/Dashboard.scss';

// Firebase
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [skillInput, setSkillInput] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    fullName: '',
    bio: '',
    phone: '',
    email: '',
    location: '',
    website: '',
    github: '',
    linkedin: '',
    twitter: '',
    avatar: ''
  });

  const [projects, setProjects] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [portfolioSettings, setPortfolioSettings] = useState({
    theme: 'modern',
    primaryColor: '#0050ff',
    isPublic: true
  });

  // Load user and portfolio from Firestore
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      const fetchData = async () => {
        const ref = doc(db, 'portfolios', parsedUser.id || parsedUser.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setProfileData(data.profileData || {});
          setProjects(data.projects || []);
          setEducation(data.education || []);
          setExperience(data.experience || []);
          setPortfolioSettings(data.portfolioSettings || portfolioSettings);
        } else {
          setProfileData(prev => ({
            ...prev,
            fullName: parsedUser.name || '',
            email: parsedUser.email || ''
          }));
        }
        setLoading(false);
      };

      fetchData();
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.error('Sign out error:', err);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const savePortfolio = async () => {
    if (!user) return;
    setSaveLoading(true);
    try {
      const ref = doc(db, 'portfolios', user.id || user.uid);
      await setDoc(ref, {
        profileData,
        projects,
        education,
        experience,
        portfolioSettings,
      }, { merge: true });
      alert('Portfolio saved successfully!');
    } catch (err) {
      console.error('Error saving portfolio:', err);
      alert('Failed to save portfolio');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    await savePortfolio();
  };

  const addSkill = () => {
    if (skillInput.trim() && !profileData.skills?.includes(skillInput.trim())) {
      const updatedSkills = [...(profileData.skills || []), skillInput.trim()];
      setProfileData({ ...profileData, skills: updatedSkills });
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    const updatedSkills = profileData.skills?.filter(skill => skill !== skillToRemove) || [];
    setProfileData({ ...profileData, skills: updatedSkills });
  };

  const addProject = () => {
    if (!newProject.title || !newProject.description) return;
    const projectData = {
      ...newProject,
      id: Date.now(),
      technologies: newProject.technologies.split(',').map(tech => tech.trim()),
      createdAt: new Date().toISOString()
    };
    setProjects([...projects, projectData]);
    setNewProject(initialProject);
    savePortfolio();
  };

  const removeProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
    savePortfolio();
  };

  const initialProject = { title: '', description: '', technologies: '', liveUrl: '', githubUrl: '', image: '', featured: false };
  const [newProject, setNewProject] = useState(initialProject);

  const addEducation = () => {
    if (!newEducation.institution || !newEducation.degree) return;
    const educationData = { ...newEducation, id: Date.now() };
    setEducation([...education, educationData]);
    setNewEducation(initialEducation);
    savePortfolio();
  };

  const removeEducation = (id) => {
    setEducation(education.filter(e => e.id !== id));
    savePortfolio();
  };

  const initialEducation = { institution: '', degree: '', field: '', startDate: '', endDate: '', current: false };
  const [newEducation, setNewEducation] = useState(initialEducation);

  const addExperience = () => {
    if (!newExperience.company || !newExperience.position) return;
    const expData = { ...newExperience, id: Date.now() };
    setExperience([...experience, expData]);
    setNewExperience(initialExperience);
    savePortfolio();
  };

  const removeExperience = (id) => {
    setExperience(experience.filter(e => e.id !== id));
    savePortfolio();
  };

  // ✅ Export as JSON
  const exportJSON = () => {
    const data = { profileData, projects, education, experience, portfolioSettings };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  // ✅ Export as HTML
  const exportHTML = () => {
    const htmlContent = `
      <html>
        <head><title>${profileData.fullName}'s Portfolio</title></head>
        <body>
          <h1>${profileData.fullName}</h1>
          <p>${profileData.bio}</p>
          <h2>Projects</h2>
          <ul>
            ${projects.map(p => `<li><strong>${p.title}</strong>: ${p.description}</li>`).join('')}
          </ul>
          <h2>Education</h2>
          <ul>
            ${education.map(e => `<li>${e.degree} at ${e.institution}</li>`).join('')}
          </ul>
          <h2>Experience</h2>
          <ul>
            ${experience.map(ex => `<li>${ex.position} at ${ex.company}</li>`).join('')}
          </ul>
        </body>
      </html>
    `;
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  // ✅ Export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(profileData.fullName || "My Portfolio", 10, 20);
    doc.setFontSize(12);
    doc.text(profileData.bio || "", 10, 30);

    let y = 40;
    doc.text("Projects:", 10, y);
    y += 10;
    projects.forEach((p) => {
      doc.text(`• ${p.title}: ${p.description}`, 10, y);
      y += 10;
    });

    doc.addPage();
    y = 20;
    doc.text("Education:", 10, y);
    y += 10;
    education.forEach((e) => {
      doc.text(`• ${e.degree} at ${e.institution}`, 10, y);
      y += 10;
    });

    doc.addPage();
    y = 20;
    doc.text("Experience:", 10, y);
    y += 10;
    experience.forEach((ex) => {
      doc.text(`• ${ex.position} at ${ex.company}`, 10, y);
      y += 10;
    });

    doc.save("portfolio.pdf");
  };

  if (loading) return <div className="loading-container"><p>Loading Dashboard...</p></div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-left">
          <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <i className="fas fa-bars"></i>
          </button>
          <div className="logo">
            <i className="fas fa-magic"></i>
            <span>DigiPratibha</span>
          </div>
          <div className="user-info">
            <div className="user-avatar"><i className="fas fa-user-circle"></i></div>
            <div className="user-details">
              <h3>Welcome back, {user.name}!</h3>
              <p>Portfolio Dashboard</p>
            </div>
          </div>
        </div>
        <div className="header-right">
          <button className="preview-btn" onClick={() => setActiveTab('builder')}>
            <i className="fas fa-eye"></i> Preview Portfolio
          </button>
          <button onClick={handleLogout} className="logout-btn">
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>

      <div className="dashboard-layout">
        <aside className={`dashboard-sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${mobileMenuOpen ? 'active' : ''}`}>
          <div className="sidebar-header">
            <button className="sidebar-toggle" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
              <i className="fas fa-bars"></i>
            </button>
            {!sidebarCollapsed && <span>Dashboard Menu</span>}
          </div>
          <nav className="sidebar-nav">
            {['profile','builder','projects','education','experience','settings','export'].map(tab => (
              <button key={tab} className={`nav-item ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                <i className="fas fa-chevron-right"></i> {tab}
              </button>
            ))}
          </nav>
        </aside>

        <main className="dashboard-main">
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSubmit} className="profile-form">
              <input type="text" value={profileData.fullName} onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })} placeholder="Full name" />
              <input type="email" value={profileData.email} onChange={(e) => setProfileData({ ...profileData, email: e.target.value })} placeholder="Email" />
              <textarea value={profileData.bio} onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })} placeholder="Bio" />
              <button type="submit" disabled={saveLoading}>{saveLoading ? 'Saving...' : 'Save Profile'}</button>
            </form>
          )}

          {activeTab === 'projects' && (
            <div>
              <input type="text" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} placeholder="Project Title" />
              <textarea value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} placeholder="Description" />
              <button onClick={addProject}>Add Project</button>
              <ul>
                {projects.map(p => <li key={p.id}>{p.title} <button onClick={() => removeProject(p.id)}>Remove</button></li>)}
              </ul>
            </div>
          )}

          {activeTab === 'education' && (
            <div>
              <input type="text" value={newEducation.institution} onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })} placeholder="Institution" />
              <input type="text" value={newEducation.degree} onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })} placeholder="Degree" />
              <button onClick={addEducation}>Add Education</button>
              <ul>
                {education.map(e => <li key={e.id}>{e.degree} at {e.institution} <button onClick={() => removeEducation(e.id)}>Remove</button></li>)}
              </ul>
            </div>
          )}

          {activeTab === 'experience' && (
            <div>
              <input type="text" value={newExperience.company} onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })} placeholder="Company" />
              <input type="text" value={newExperience.position} onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })} placeholder="Position" />
              <button onClick={addExperience}>Add Experience</button>
              <ul>
                {experience.map(exp => <li key={exp.id}>{exp.position} at {exp.company} <button onClick={() => removeExperience(exp.id)}>Remove</button></li>)}
              </ul>
            </div>
          )}

          {activeTab === 'builder' && <PortfolioBuilder />}

          {activeTab === 'export' && (
            <div className="export-section">
              <h2>Export Your Portfolio</h2>
              <button onClick={exportJSON}>Download JSON</button>
              <button onClick={exportHTML}>Download HTML</button>
              <button onClick={exportPDF}>Download PDF</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;