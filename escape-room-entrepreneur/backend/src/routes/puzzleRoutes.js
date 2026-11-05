const express = require('express');
const router = express.Router();
const puzzleController = require('../controllers/puzzleController');
const { authenticateToken } = require('../middleware/auth');

router.post('/puzzles/validate', authenticateToken, puzzleController.validatePuzzle);

module.exports = router;
