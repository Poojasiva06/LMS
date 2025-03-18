import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user || user.role !== "Student") {
        navigate("/login");
        return null;
    }

    return (
        <div className="dashboard-container">
            <h1>Welcome to Your Dashboard!</h1>
            <p>Hi, {user?.name}! You are successfully logged in as a Student.</p>
            <button onClick={() => { logout(); navigate("/login"); }}>Logout</button>
        </div>
    );
};

export default Dashboard;
