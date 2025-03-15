import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Enrollment.css";


function Enrollment() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const studentId = "67d4f959ec438358a988dc68"; // Simulating a logged-in student

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses");
        console.log("Courses from API:", res.data);
        setCourses(res.data || []); // Ensure it's always an array
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    const fetchEnrollments = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/enrollments/${studentId}`);
        console.log("Enrolled courses:", res.data);
        setEnrolledCourses(res.data || []);
      } catch (err) {
        console.error("Error fetching enrollments:", err);
      }
    };

    fetchCourses();
    fetchEnrollments();
  }, []);

  const enrollCourse = async (courseId) => {
    try {
      console.log("Enrolling with Course ID:", courseId);

      const response = await axios.post("http://localhost:5000/api/enrollments", {
        studentId,
        courseId,
      });

      console.log("Enrollment Response:", response.data);
      alert("✅ Enrolled Successfully!");

      // Update state instead of reloading the page
      setEnrolledCourses((prev) => [...prev, courses.find(course => course._id === courseId)]);
    } catch (error) {
      console.error("❌ Enrollment Error:", error.response?.data || error.message);
      alert("⚠️ Enrollment Failed: " + (error.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <div className="container mt-4">
      <h2>Available Courses</h2>
      <ul className="list-group">
        {courses.map((course) => (
          <li key={course._id} className="list-group-item d-flex justify-content-between align-items-center">
            {course.name}
            <button
              className="btn btn-success"
              onClick={() => enrollCourse(course._id)}
              disabled={enrolledCourses.some((enrolled) => enrolled._id === course._id)}
            >
              {enrolledCourses.some((enrolled) => enrolled._id === course._id) ? "Enrolled" : "Enroll"}
            </button>
          </li>
        ))}
      </ul>

      <h2 className="mt-4">Enrolled Courses</h2>
      <ul className="list-group">
        {enrolledCourses.length > 0 ? (
          enrolledCourses.map((course) => (
            <li key={course._id} className="list-group-item">{course.name}</li>
          ))
        ) : (
          <li className="list-group-item text-muted">No enrollments yet</li>
        )}
      </ul>
    </div>
  );
}

export default Enrollment;
