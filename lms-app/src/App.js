import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
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
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/discussion" element={<DiscussionForum />} />

        </Routes>
        <NotificationList />
      </Router>
    </NotificationProvider>
  );
}

export default App;
