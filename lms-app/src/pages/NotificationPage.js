import React, { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

const NotificationPage = () => {
  const { notifications } = useContext(NotificationContext);

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>{notification.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationPage;
