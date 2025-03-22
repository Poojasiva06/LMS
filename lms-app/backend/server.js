require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({ 
  origin: process.env.CLIENT_URL || "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"], 
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json()); // Parse JSON request body

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Store notifications & discussions (Temporary, use DB in production)
let notifications = [];
let discussions = [];

// WebSocket connection
io.on("connection", (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  // Send existing notifications & discussions on connect
  socket.emit("receive_notifications", notifications);
  socket.emit("receive_discussions", discussions);

  // Handle new notification
  socket.on("send_notification", (data) => {
    try {
      if (!data || !data.message) return;
      notifications.push(data);
      io.emit("receive_notifications", notifications); // Broadcast to all
      console.log("🔔 New notification:", data);
    } catch (error) {
      console.error("⚠️ Error sending notification:", error);
    }
  });

  // Handle new discussion post
  socket.on("new_discussion", (post) => {
    try {
      if (!post || !post.content || !post.user) return;
      
      const newPost = {
        id: discussions.length + 1,
        user: post.user,
        content: post.content,
        timestamp: new Date().toISOString(),
      };

      discussions.push(newPost);
      io.emit("receive_discussions", discussions); // Broadcast to all users
      console.log("📢 New discussion:", newPost);
    } catch (error) {
      console.error("⚠️ Error handling new discussion:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

// 🚀 API Route: Fetch discussions
app.get("/api/discussions", (req, res) => {
  try {
    console.log("📨 Fetching discussions...");
    res.status(200).json(discussions);
  } catch (error) {
    console.error("⚠️ Error fetching discussions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🚀 API Route: Post new discussion
app.post("/api/discussions", (req, res) => {
  try {
    console.log("📩 Received post request:", req.body);
    
    const { user, content } = req.body;
    if (!user || !content) {
      console.error("❌ Missing user or content");
      return res.status(400).json({ error: "User and content are required" });
    }

    const newPost = {
      id: discussions.length + 1,
      user,
      content,
      timestamp: new Date().toISOString(),
    };

    discussions.push(newPost);
    io.emit("receive_discussions", discussions); // Update all clients

    console.log("✅ New discussion added:", newPost);
    res.status(201).json(newPost);
  } catch (error) {
    console.error("⚠️ Error posting discussion:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
