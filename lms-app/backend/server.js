const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({ 
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"], 
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json()); // Parse JSON request body

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Store notifications & discussions (Use DB in production)
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
    notifications.push(data);
    io.emit("receive_notifications", notifications); // Broadcast to all
  });

  // Handle new discussion post
  socket.on("new_discussion", (post) => {
    discussions.push(post);
    io.emit("receive_discussions", discussions); // Broadcast to all users
  });

  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

// 🚀 API Route: Fetch discussions
app.get("/api/discussions", (req, res) => {
  console.log("📨 Fetching discussions...");
  res.json(discussions);
});

// 🚀 API Route: Post new discussion
app.post("/api/discussions", (req, res) => {
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
});

// Start the server
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
