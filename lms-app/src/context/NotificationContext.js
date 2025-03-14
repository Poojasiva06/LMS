import { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Backend WebSocket URL

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Check if the socket is connected
    console.log("Socket Connected:", socket.connected);

    // Listen for notifications from backend
    socket.on("receive_notifications", (data) => {
      console.log("New Notification Received:", data);
      setNotifications((prevNotifications) => [...prevNotifications, data]); // Append new notifications
    });

    return () => {
      socket.off("receive_notifications");
    };
  }, []);

  // Function to send a notification
  const sendNotification = (message) => {
    const newNotification = {
      id: Date.now(),
      message: message,
      timestamp: new Date().toISOString(),
    };
    console.log("Sending Notification:", newNotification);
    socket.emit("send_notification", newNotification);
  };

  return (
    <NotificationContext.Provider value={{ notifications, sendNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
