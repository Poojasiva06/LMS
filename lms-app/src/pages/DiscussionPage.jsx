import React, { useState, useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";
import axios from "axios";

const DiscussionPage = () => {
  const [content, setContent] = useState("");
  const { sendNotification } = useContext(NotificationContext);

  const handlePost = async () => {
    if (!content) return;
    const newPost = { user: "Student", content, timestamp: new Date().toISOString() };

    try {
      await axios.post("http://localhost:5000/api/discussions", newPost);
      sendNotification("New discussion post added!");
      setContent("");
    } catch (error) {
      console.error("Error posting discussion:", error);
    }
  };

  return (
    <div>
      <h2>Discussion Forum</h2>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write something..."></textarea>
      <button onClick={handlePost}>Post</button>
    </div>
  );
};

export default DiscussionPage;
