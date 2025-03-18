import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user || user.role !== "Teacher") {
        navigate("/login");
        return null;
    }

    return (
        <div className="dashboard">
            <h2>Teacher Panel</h2>
            <p>Welcome, {user?.name}! (Teacher)</p>
            <button onClick={() => { logout(); navigate("/login"); }}>Logout</button>
        </div>
    );
};

export default Admin;
