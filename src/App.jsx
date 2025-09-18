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
import Demo from "./components/Demo.jsx";      // 👈 Demo page
import LearnMore from "./components/LearnMore"; // 👈 Learn More page

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/demo" element={<Demo />} /> {/* 👈 Demo Page Route */}
          <Route path="/learn-more" element={<LearnMore />} /> {/* 👈 Learn More Page Route */}

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
