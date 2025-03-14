import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    setCourses(storedCourses);
  }, []);

  const logout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h2>Student Dashboard</h2>
      <button className="btn btn-danger mb-3" onClick={logout}>Logout</button>

      <h3>Available Courses</h3>
      <ul className="list-group">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <li key={index} className="list-group-item">
              <strong>{course.name}</strong>
              <p>{course.description}</p>
            </li>
          ))
        ) : (
          <p>No courses available</p>
        )}
      </ul>
    </div>
  );
};

export default StudentDashboard;
