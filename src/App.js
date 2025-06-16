import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AdminDashboard from "./components/AdminDashboard";
import CreateExam from "./components/CreateExam";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/create-exam" element={<CreateExam />} />
       </Routes>
    </Router>
  );
}

export default App;
