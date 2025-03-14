import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5001"); // Ensure backend WebSocket is running

function DiscussionForum() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  // ✅ Fetch discussions on mount
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/discussions")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("❌ Error fetching discussions:", error));

    // ✅ Listen for new messages via WebSocket
    socket.on("receive_discussions", (updatedPosts) => {
      console.log("📩 Received new discussions:", updatedPosts);
      setPosts(updatedPosts);
    });

    return () => {
      socket.off("receive_discussions");
    };
  }, []);

  // ✅ Handle posting a new discussion
  const handlePostSubmit = async () => {
    if (!newPost.trim()) return;

    const postData = {
      user: "Student", // Replace with real user data
      content: newPost,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await axios.post(
        "http://localhost:5001/api/discussions",
        postData
      );

      console.log("✅ Post successful:", response.data);

      // ✅ Send update via WebSocket
      socket.emit("new_discussion", response.data);

      setNewPost(""); // ✅ Clear input
    } catch (error) {
      console.error("❌ Error posting discussion:", error.message);
    }
  };

  return (
    <div>
      <h2>Discussion Forum</h2>
      <textarea
        placeholder="Write your message..."
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
      />
      <button onClick={handlePostSubmit}>Post</button>

      <div>
        {posts.length === 0 ? (
          <p>No discussions yet.</p>
        ) : (
          posts.map((post, index) => (
            <div key={index}>
              <p>
                <strong>{post.user}</strong>: {post.content}
              </p>
              <small>{new Date(post.timestamp).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DiscussionForum;
