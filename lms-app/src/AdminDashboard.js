import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const [courseName, setCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [courseUrl, setCourseUrl] = useState("");
    const [courses, setCourses] = useState([]);
    const [editingCourseId, setEditingCourseId] = useState(null);

    useEffect(() => {
        const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
        setCourses(storedCourses);
    }, []);

    const addOrUpdateCourse = () => {
        if (!courseName || !courseDescription || !courseUrl) {
            alert("Please fill in all fields!");
            return;
        }

        let updatedCourses;

        if (editingCourseId) {
            updatedCourses = courses.map((course) =>
                course.id === editingCourseId
                    ? { ...course, name: courseName, description: courseDescription, url: courseUrl }
                    : course
            );
            setEditingCourseId(null);
        } else {
            const newCourse = { id: Date.now(), name: courseName, description: courseDescription, url: courseUrl };
            updatedCourses = [...courses, newCourse];
        }

        setCourses(updatedCourses);
        localStorage.setItem("courses", JSON.stringify(updatedCourses));

        setCourseName("");
        setCourseDescription("");
        setCourseUrl("");
    };

    const editCourse = (course) => {
        setCourseName(course.name);
        setCourseDescription(course.description);
        setCourseUrl(course.url);
        setEditingCourseId(course.id);
    };

    const deleteCourse = (id) => {
        const updatedCourses = courses.filter((course) => course.id !== id);
        setCourses(updatedCourses);
        localStorage.setItem("courses", JSON.stringify(updatedCourses));
    };

    const exitDashboard = () => {
        window.location.href = "/";
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>

            <div className="course-form">
                <input
                    type="text"
                    placeholder="Course Name"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                />

                <textarea
                    placeholder="Course Description"
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Course URL (YouTube link)"
                    value={courseUrl}
                    onChange={(e) => setCourseUrl(e.target.value)}
                />

                <button onClick={addOrUpdateCourse}>
                    {editingCourseId ? "Update Course" : "Add Course"}
                </button>
            </div>

            <div className="course-container">
                {courses.map((course) => (
                    <div key={course.id} className="course-card">
                        <h3>{course.name}</h3>
                        <p>{course.description}</p>
                        {course.url && (
                            <iframe
                                width="100%"
                                height="200"
                                src={course.url}
                                title={course.name}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        )}
                        <div className="button-group">
                            <button onClick={() => editCourse(course)}>Edit</button>
                            <button onClick={() => deleteCourse(course.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            <button className="exit-button" onClick={exitDashboard}>Exit</button>
        </div>
    );
};

export default AdminDashboard;