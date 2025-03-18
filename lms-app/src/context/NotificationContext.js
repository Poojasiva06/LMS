import React, { createContext, useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:5001");

    socketRef.current.on("new_notification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []); // ✅ No dependencies needed, socketRef persists across renders

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
