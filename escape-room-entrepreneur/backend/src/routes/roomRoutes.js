const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const { authenticateToken } = require('../middleware/auth');

router.get('/rooms', authenticateToken, roomController.getRooms);
router.get('/rooms/:moduleId/progress', authenticateToken, roomController.getRoomProgress);
router.put('/rooms/:moduleId/progress', authenticateToken, roomController.updateRoomProgress);
router.post('/rooms/:moduleId/complete', authenticateToken, roomController.completeRoom);

module.exports = router;
