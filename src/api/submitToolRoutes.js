const express = require('express');
const router = express.Router();
const { submitTool } = require('./submitTool');

// POST endpoint for tool submission
router.post('/submit-tool', submitTool);

module.exports = router;