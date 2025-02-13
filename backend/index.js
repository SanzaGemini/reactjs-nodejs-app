const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const port = process.env.PORT || 5000;

const MONGO_URL = "mongodb://localhost:27017/studentDB";
const MONGO_URL_Docker = "mongodb://root:example@db:27017/studentDB"

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from React frontend
app.use(express.static(path.join(__dirname, "../frontend/build")));

mongoose
  .connect(MONGO_URL_Docker, {
    useNewUrlParser: true, // Not needed in MongoDB 4+, but safe to keep
    useUnifiedTopology: true, // Not needed in MongoDB 4+, but safe to keep
    authSource: "admin", // Required when using authentication
  }
  )
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Define a schema for Student Marks
const studentMarkSchema = new mongoose.Schema({
  name: String,
  iteration1: Number,
});

// Create a model
const StudentMark = mongoose.model("StudentMark", studentMarkSchema);

// API endpoint example
app.get("/api/data", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// API endpoint to fetch student marks
app.get("/api/student-marks", async (req, res) => {
  try {
    const marks = await StudentMark.find({});
    res.json(marks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
});

// Handle React routing (for frontend navigation)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
