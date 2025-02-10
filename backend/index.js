const express = require('express');
const path = require('path');
const http = require('http');
const { HttpAgent } = require('agentkeepalive');
const mongoose = require('mongoose');
const cors = require('cors');

const port = process.env.PORT || 3001;

const app = express();
const keepaliveAgent = new HttpAgent({});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));
// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/studentDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// API endpoint example
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
// Define a schema for Student Marks
const studentMarkSchema = new mongoose.Schema({
  name: String,
  iteration1: Number,
  iteration2: Number,
  iteration3: Number,
  iteration4: Number,
  yearMark: Number,
});

const server = http.createServer(app);
server.agent = keepaliveAgent;

// Create a model
const StudentMark = mongoose.model('StudentMark', studentMarkSchema);

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// API endpoint to fetch data
app.get('/api/student-marks', async (req, res) => {
  try {
    const marks = await StudentMark.find({});
    res.json(marks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});











