const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const submitToolRoutes = require('./src/api/submitToolRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// API Routes
app.use('/api', submitToolRoutes);

// Serve the main HTML file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});