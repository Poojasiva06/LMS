import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { NotificationContext } from "../context/NotificationContext";

const DiscussionForum = () => {
  const [message, setMessage] = useState(""); // Stores input message
  const [messages, setMessages] = useState([]); // Stores posted messages
  const socketRef = useRef(null);
  const { setNotifications } = useContext(NotificationContext); // Access notifications

  useEffect(() => {
    // Connect to the backend WebSocket server
    socketRef.current = io("http://localhost:5001");

    // Listen for new messages
    socketRef.current.on("new_message", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handlePostMessage = async () => {
    if (!message.trim()) return; // Prevent empty messages

    try {
      const response = await axios.post("http://localhost:5001/api/messages", {
        content: message,
      });

      const newMessage = response.data;

      // Emit message to WebSocket server
      socketRef.current.emit("send_message", newMessage);

      // Clear input field after sending
      setMessage("");

      // Add notification
      setNotifications((prev) => [...prev, { message: "New message posted!" }]);
    } catch (error) {
      console.error("Error posting message:", error);
    }
  };

  return (
    <div>
      <h2>Discussion Forum</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handlePostMessage}>Post</button>

      <h3>Messages</h3>
      {messages.length === 0 ? (
        <p>No discussions yet.</p>
      ) : (
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg.content}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DiscussionForum;
