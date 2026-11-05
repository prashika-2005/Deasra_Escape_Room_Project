const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { authenticateToken } = require('../middleware/auth');

router.get('/inventory', authenticateToken, inventoryController.getInventory);
router.post('/inventory/collect', authenticateToken, inventoryController.collectItem);

module.exports = router;
