import React, { useState, useEffect } from "react";
import axios from "axios";

function DiscussionForum() {
  const [posts, setPosts] = useState([]); // Holds all discussion posts
  const [newPost, setNewPost] = useState(""); // Holds new input message

  // ✅ Fetch discussions when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/discussions") // Ensure correct API URL
      .then((response) => {
        console.log("Fetched Discussions:", response.data); // Debugging
        setPosts(response.data);
      })
      .catch((error) =>
        console.error("Error fetching discussions:", error.message)
      );
  }, []); // ✅ Run only once when component mounts

  // ✅ Handle posting a new discussion
  const handlePostSubmit = async () => {
    if (!newPost.trim()) {
      console.log("Cannot post an empty message!"); // Debugging
      return;
    }

    const postData = {
      user: "Student", // Replace with actual user data
      content: newPost,
      timestamp: new Date().toISOString(),
    };

    console.log("Posting:", postData); // Debugging

    try {
      const response = await axios.post(
        "http://localhost:5001/api/discussions",
        postData
      );

      console.log("Post Response:", response.data); // Debugging

      // ✅ Update the posts state correctly
      setPosts((prevPosts) => [...prevPosts, response.data]);

      setNewPost(""); // ✅ Clear input after posting
    } catch (error) {
      console.error("Error posting discussion:", error.message);
    }
  };

  return (
    <div>
      <h2>Discussion Forum</h2>
      <textarea
        placeholder="Write your message..."
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)} // ✅ Fix input handler
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
