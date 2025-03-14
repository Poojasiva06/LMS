import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotificationPage from "./pages/NotificationPage";
import DiscussionForum from "./pages/DiscussionForum";
import { NotificationProvider } from "./context/NotificationContext";

function App() {
  return (
    <NotificationProvider>
      <Router>
        <Routes>
          
        <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/discussion" element={<DiscussionForum />} />
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </Router>
    </NotificationProvider>
  );
}

export default App;
