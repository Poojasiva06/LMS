import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    setCourses(storedCourses);
  }, []);

  const saveCoursesToLocalStorage = (updatedCourses) => {
    setCourses(updatedCourses);
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
  };

  const addCourse = () => {
    if (newCourse.trim()) {
      const updatedCourses = [...courses, { name: newCourse, description: newDescription }];
      saveCoursesToLocalStorage(updatedCourses);
      setNewCourse("");
      setNewDescription("");
    }
  };

  const editCourse = (index) => {
    setEditingIndex(index);
    setNewCourse(courses[index].name);
    setNewDescription(courses[index].description);
  };

  const updateCourse = () => {
    let updatedCourses = [...courses];
    updatedCourses[editingIndex] = { name: newCourse, description: newDescription };
    saveCoursesToLocalStorage(updatedCourses);
    setEditingIndex(null);
    setNewCourse("");
    setNewDescription("");
  };

  const deleteCourse = (index) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    saveCoursesToLocalStorage(updatedCourses);
  };

  const logout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      <button className="btn btn-danger mb-3" onClick={logout}>Logout</button>

      <h3>Manage Courses</h3>
      <div className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Course Name"
          value={newCourse}
          onChange={(e) => setNewCourse(e.target.value)}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Course Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        {editingIndex === null ? (
          <button className="btn btn-success" onClick={addCourse}>Add Course</button>
        ) : (
          <button className="btn btn-primary" onClick={updateCourse}>Update Course</button>
        )}
      </div>

      <ul className="list-group">
        {courses.map((course, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{course.name}</strong>
              <p>{course.description}</p>
            </div>
            <div>
              <button className="btn btn-warning me-2" onClick={() => editCourse(index)}>Edit</button>
              <button className="btn btn-danger" onClick={() => deleteCourse(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
