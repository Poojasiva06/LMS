require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// 📌 Define Models
const Student = mongoose.model("Student", new mongoose.Schema({ name: String }));
const Course = mongoose.model("Course", new mongoose.Schema({ name: String }));
const Enrollment = mongoose.model("Enrollment", new mongoose.Schema({ 
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true }, 
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true } 
}));

// 🛠 API to Add Sample Student (For Testing)
app.get("/api/add-student", async (req, res) => {
  try {
    const student = await Student.create({ name: "John Doe" });
    res.json({ message: "🎉 Student Added!", studentId: student._id });
  } catch (error) {
    console.error("❌ Error adding student:", error);
    res.status(500).json({ message: "❌ Error adding student", error });
  }
});

// 🛠 API to Add Sample Courses (Avoid Duplicates)
app.get("/api/setup", async (req, res) => {
  try {
    const existingCourses = await Course.find();
    if (existingCourses.length === 0) {
      await Course.create([{ name: "React Basics" }, { name: "Node.js Fundamentals" }]);
      return res.send("📚 Sample Courses Added!");
    }
    res.send("✅ Courses already exist!");
  } catch (error) {
    console.error("❌ Error adding courses:", error);
    res.status(500).json({ message: "❌ Error adding courses", error });
  }
});

// 📌 Fetch All Students
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error("❌ Error fetching students:", error);
    res.status(500).json({ message: "❌ Error fetching students", error });
  }
});

// 📌 Fetch All Courses
app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error("❌ Error fetching courses:", error);
    res.status(500).json({ message: "❌ Error fetching courses", error });
  }
});

// 📌 Enroll a Student in a Course
app.post("/api/enrollments", async (req, res) => {
  const { studentId, courseId } = req.body;

  try {
    // ✅ Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: "❌ Invalid studentId format. Must be a valid MongoDB ObjectId." });
    }
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "❌ Invalid courseId format. Must be a valid MongoDB ObjectId." });
    }

    // ✅ Ensure Student and Course Exist
    const studentExists = await Student.findById(studentId);
    if (!studentExists) {
      return res.status(404).json({ message: "❌ Student Not Found. Please add a valid student." });
    }

    const courseExists = await Course.findById(courseId);
    if (!courseExists) {
      return res.status(404).json({ message: "❌ Course Not Found. Please add a valid course." });
    }

    // 🔍 Check if Already Enrolled
    const existingEnrollment = await Enrollment.findOne({ studentId, courseId });
    if (existingEnrollment) {
      return res.status(400).json({ message: "⚠️ Student is Already Enrolled in this Course!" });
    }

    // ✅ Enroll the Student
    await Enrollment.create({ studentId, courseId });
    res.json({ message: "🎉 Student Enrolled Successfully!" });

  } catch (error) {
    console.error("❌ Error Enrolling Student:", error);
    res.status(500).json({ message: "❌ Internal Server Error", error });
  }
});

// 📌 Get All Enrollments
app.get("/api/enrollments", async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("studentId", "name")
      .populate("courseId", "name");
    res.json(enrollments);
  } catch (error) {
    console.error("❌ Error fetching enrollments:", error);
    res.status(500).json({ message: "❌ Error fetching enrollments", error });
  }
});

// 📌 Get All Courses a Student is Enrolled In
app.get("/api/enrollments/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;

    // ✅ Validate studentId
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: "❌ Invalid studentId format." });
    }

    // ✅ Check if Student Exists
    const studentExists = await Student.findById(studentId);
    if (!studentExists) {
      return res.status(404).json({ message: "❌ Student Not Found." });
    }

    // 🔍 Fetch enrollments
    const enrollments = await Enrollment.find({ studentId }).populate("courseId");

    if (enrollments.length === 0) {
      return res.status(404).json({ message: "⚠️ No enrollments found for this student." });
    }

    // 🎯 Send response
    res.json(enrollments.map(enrollment => ({
      studentId: enrollment.studentId,
      courseId: enrollment.courseId?._id,
      courseName: enrollment.courseId?.name || "Unknown Course"
    })));
  } catch (error) {
    console.error("❌ Error fetching student enrollments:", error);
    res.status(500).json({ message: "❌ Internal Server Error", error });
  }
});

// 🚀 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
