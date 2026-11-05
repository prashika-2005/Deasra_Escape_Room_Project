const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');
const { authenticateToken } = require('../middleware/auth');

router.get('/shop/items', authenticateToken, shopController.getShopItems);
router.post('/shop/purchase', authenticateToken, shopController.purchaseItem);

module.exports = router;
