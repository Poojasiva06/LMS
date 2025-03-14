import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//import HomePage from "./pages/HomePage";
//import LoginPage from "./pages/LoginPage";
import DiscussionForum from "./pages/DiscussionForum";
//import DashboardPage from "./pages/DashboardPage";
//import CoursePage from "./pages/CoursePage";
import { NotificationProvider } from "./context/NotificationContext";
import NotificationList from "./components/NotificationList";

function App() {
  return (
    <NotificationProvider>
      <Router>
        <Routes>
      
          <Route path="/discussion" element={<DiscussionForum />} />

        </Routes>
        <NotificationList />
      </Router>
    </NotificationProvider>

import Login from "./Login";
import StudentDashboard from "./StudentDashboard";
import AdminDashboard from "./AdminDashboard";

function App() {
  const handleLogin = (type) => {
    console.log("User logged in as:", type); // Debugging purpose
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>

  );
}

export default App;
