import React from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
    const navigate = useNavigate();

    return (
        <div className="center-container">
            <h1>Welcome to the LMS Platform</h1>
            <p>"Education is the most powerful weapon which you can use to change the world." – Nelson Mandela</p>
            <button onClick={() => navigate("/signup")}>Sign Up</button>
            <button onClick={() => navigate("/login")}>Login</button>
        </div>
    );
}

export default Welcome;
