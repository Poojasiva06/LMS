import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

const Navbar = () => {
  const { notifications } = useContext(NotificationContext);

  return (
    <nav>
      <h2>LMS</h2>
      <div>
        <button>Dashboard</button>
        <button>Courses</button>
        <button>Discussions</button>
        <button>Notifications ({notifications.length})</button>
      </div>
    </nav>
  );
};

export default Navbar;
