import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Enrollment from "./components/Enrollment";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Enrollment />} />
      </Routes>
    </Router>
  );
}

export default App;
