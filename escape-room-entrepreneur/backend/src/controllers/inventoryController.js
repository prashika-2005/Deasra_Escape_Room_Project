const pool = require('../config/db');

// Get Player Inventory
async function getInventory(req, res) {
  try {
    const userId = req.user.id;
    const [rows] = await pool.execute(
      'SELECT item_id, item_name, item_type, acquired_at FROM player_inventory WHERE user_id = ? ORDER BY acquired_at ASC',
      [userId]
    );

    const items = rows.map(r => ({
      id: r.item_id,
      name: r.item_name,
      type: r.item_type,
      acquiredAt: r.acquired_at
    }));

    return res.json({ success: true, inventory: items });
  } catch (error) {
    console.error('Get Inventory Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve inventory.' });
  }
}

// Collect Inventory Item
async function collectItem(req, res) {
  try {
    const userId = req.user.id;
    const { itemId, itemName, itemType } = req.body;

    if (!itemId || !itemName) {
      return res.status(400).json({ success: false, message: 'itemId and itemName are required.' });
    }

    await pool.execute(
      `INSERT INTO player_inventory (user_id, item_id, item_name, item_type)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE item_name = VALUES(item_name)`,
      [userId, itemId, itemName, itemType || 'puzzle_item']
    );

    return res.json({ success: true, message: `Collected ${itemName}!`, item: { id: itemId, name: itemName, type: itemType } });
  } catch (error) {
    console.error('Collect Item Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to collect inventory item.' });
  }
}

module.exports = { getInventory, collectItem };
