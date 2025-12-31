// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Home from "./components/Home";
import Templates from "./components/Templates";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import PortfolioBuilder from "./components/PortfolioBuilder";
import PortfolioPreviewPage from "./components/PortfolioPreviewPage";
import Demo from "./components/Demo.jsx";
import LearnMore from "./components/LearnMore";
import About from "./components/About";
import TermsOfUse from "./components/TermsOfUse";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ScrollToTop from "./components/ScrollToTop";
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./components/Logout";

import "./App.css";
import "./styles/PortfolioPreview.scss"; // 👈 ADDED: Global import for PDF export styles

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/logout" element={<Logout />} />

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/builder"
            element={
              <PrivateRoute>
                <PortfolioBuilder />
              </PrivateRoute>
            }
          />
          <Route
            path="/preview"
            element={
              <PrivateRoute>
                <PortfolioPreviewPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
