import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Login";
import AdminDashboard from "./AdminDashboard";
import StudentDashboard from "./StudentDashboard";
import AdminQuiz from "./AdminQuiz";
import StudentQuiz from "./StudentQuiz"; // ✅ Import StudentQuiz
import "./App.css";

function App() {
  const navigate = useNavigate();

  const handleLogin = (userRole) => {
    if (userRole === "admin") {
      navigate("/admin-dashboard");
    } else if (userRole === "student") {
      navigate("/student-dashboard");
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Login onLogin={handleLogin} />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/admin-quiz" element={<AdminQuiz />} />
      <Route path="/student-quiz" element={<StudentQuiz />} /> {/* ✅ Added StudentQuiz */}
    </Routes>
  );
}

export default App;
