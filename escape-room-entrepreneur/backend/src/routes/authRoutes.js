const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/logout', authController.logout);
router.get('/auth/me', authenticateToken, authController.getProfile);
router.get('/users/profile', authenticateToken, authController.getProfile);
router.put('/users/profile', authenticateToken, authController.updateProfile);

module.exports = router;
