import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

const NotificationList = () => {
  const { notifications } = useContext(NotificationContext);

  return (
    <div className="notifications">
      <h3>Notifications</h3>

      {notifications.length === 0 ? (
        <p>No new notifications</p> // ✅ Handle empty list
      ) : (
        <ul>
          {notifications.map((notif) => (
            <li key={notif.id}>
              {notif.message} -{" "}
              {notif.timestamp
                ? new Date(notif.timestamp).toLocaleTimeString()
                : "Just now"} {/* ✅ Fallback if timestamp is missing */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationList;
