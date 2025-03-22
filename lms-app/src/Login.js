import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ onLogin }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle course or quiz selection
  const handleSelection = (option) => {
    setSelectedOption(option);
  };

  // Handle login
  const handleLogin = () => {
    if (!selectedOption) {
      alert("Please select Course or Quiz first!");
      return;
    }

    if (username === "admin" && password === "admin123") {
      onLogin("admin");
      navigate(selectedOption === "course" ? "/admin-dashboard" : "/admin-quiz");
    } else if (username === "student" && password === "student123") {
      onLogin("student");
      navigate(selectedOption === "course" ? "/student-dashboard" : "/student-quiz");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h1>Select Course or Quiz</h1>
      <div className="selection-buttons">
        <button 
          className={selectedOption === "course" ? "selected" : ""}
          onClick={() => handleSelection("course")}
        >
          Course
        </button>
        <button 
          className={selectedOption === "quiz" ? "selected" : ""}
          onClick={() => handleSelection("quiz")}
        >
          Quiz
        </button>
      </div>

      {selectedOption && (
        <>
          <h1>Login</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </>
      )}
    </div>
  );
}

export default Login;
