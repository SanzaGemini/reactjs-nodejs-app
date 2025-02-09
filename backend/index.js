const express = require('express');
const path = require('path');
const http = require('http');
const { HttpAgent } = require('agentkeepalive');

const app = express();
const keepaliveAgent = new HttpAgent({});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// API endpoint example
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

const server = http.createServer(app);
server.agent = keepaliveAgent;

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});