const express = require('express');
const router = express.Router();
const xpController = require('../controllers/xpController');
const { authenticateToken } = require('../middleware/auth');

router.get('/xp', authenticateToken, xpController.getXP);
router.post('/xp/award', authenticateToken, xpController.awardXP);
router.get('/xp/transactions', authenticateToken, xpController.getXPTransactions);
router.get('/leaderboard', authenticateToken, xpController.getLeaderboard);

module.exports = router;
