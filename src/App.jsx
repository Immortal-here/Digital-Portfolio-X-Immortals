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
import Demo from "./components/Demo.jsx";        // Demo page
import LearnMore from "./components/LearnMore";  // Learn More page
import About from "./components/About";          // About page
import TermsOfUse from "./components/TermsOfUse"; // ✅ Terms of Use page
import PrivacyPolicy from "./components/PrivacyPolicy"; // ✅ Privacy Policy page
import ScrollToTop from "./components/ScrollToTop"; // ✅ ScrollToTop component

import "./App.css";

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* ✅ ensures every page loads at the top */}
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
          <Route path="/terms" element={<TermsOfUse />} />       {/* ✅ wired */}
          <Route path="/privacy" element={<PrivacyPolicy />} />  {/* ✅ wired */}

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* User Dashboard routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/builder" element={<Dashboard />} />
          <Route path="/preview" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
