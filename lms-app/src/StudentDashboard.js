import React, { useEffect, useState } from "react";
import "./StudentDashboard.css"; // Import the CSS file

const StudentDashboard = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
        setCourses(storedCourses);
    }, []);

    return (
        <div className="student-dashboard">
            <h2>Student Dashboard</h2>
            {courses.length === 0 ? (
                <p className="no-courses">No courses available</p>
            ) : (
                <div className="course-grid"> 
                    {courses.map((course) => (
                        <div key={course.id} className="course-card">
                            <h3>{course.name}</h3>
                            <p className="course-description">{course.description}</p>
                            {course.url && (
                                <div className="video-container"> 
                                    <iframe
                                        width="560"
                                        height="315"
                                        src={course.url}
                                        title={course.name}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;