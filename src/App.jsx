import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Templates from "./components/Templates";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/builder" element={<Dashboard />} />
          <Route path="/preview" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
