const pool = require('../config/db');

// Get Shop Catalog Items
async function getShopItems(req, res) {
  try {
    const [rows] = await pool.execute('SELECT item_code, item_name, item_type, cost_xp, description FROM shop_inventory_items');
    return res.json({ success: true, items: rows });
  } catch (error) {
    console.error('Get Shop Items Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve shop items.' });
  }
}

// Purchase Item with XP Deduction
async function purchaseItem(req, res) {
  const connection = await pool.getConnection();
  try {
    const userId = req.user.id;
    const { itemCode } = req.body;

    if (!itemCode) {
      return res.status(400).json({ success: false, message: 'itemCode is required.' });
    }

    await connection.beginTransaction();

    // 1. Get Item details
    const [items] = await connection.execute(
      'SELECT item_code, item_name, cost_xp FROM shop_inventory_items WHERE item_code = ?',
      [itemCode]
    );

    if (items.length === 0) {
      await connection.rollback();
      return res.status(404).json({ success: false, message: 'Shop item not found.' });
    }

    const item = items[0];

    // 2. Check user's current XP balance
    const [xpRows] = await connection.execute(
      'SELECT total_xp, spend_xp FROM user_xp WHERE user_id = ?',
      [userId]
    );

    if (xpRows.length === 0) {
      await connection.rollback();
      return res.status(400).json({ success: false, message: 'User XP profile not found.' });
    }

    const userXp = xpRows[0];
    if (userXp.total_xp < item.cost_xp) {
      await connection.rollback();
      return res.status(400).json({
        success: false,
        message: `Insufficient XP balance. Required: ${item.cost_xp} XP, Available: ${userXp.total_xp} XP.`
      });
    }

    // 3. Check duplicate purchase
    const [purchased] = await connection.execute(
      'SELECT id FROM user_purchases WHERE user_id = ? AND item_code = ?',
      [userId, itemCode]
    );

    if (purchased.length > 0) {
      await connection.rollback();
      return res.status(409).json({ success: false, message: 'Item already purchased.' });
    }

    // 4. Record purchase
    await connection.execute(
      'INSERT INTO user_purchases (user_id, item_code) VALUES (?, ?)',
      [userId, itemCode]
    );

    // 5. Create XP Transaction (-XP SPEND)
    await connection.execute(
      `INSERT INTO xp_transactions (user_id, xp_type, xp_amount, source_id, source_name)
       VALUES (?, 'SPEND', ?, ?, ?)`,
      [userId, -item.cost_xp, itemCode, `Shop Purchase: ${item.item_name}`]
    );

    // 6. Deduct XP in user_xp summary
    await connection.execute(
      `UPDATE user_xp 
       SET spend_xp = spend_xp + ?,
           total_xp = video_xp + quiz_xp + activity_xp + streak_xp - (spend_xp + ?)
       WHERE user_id = ?`,
      [item.cost_xp, item.cost_xp, userId]
    );

    const [updatedXp] = await connection.execute('SELECT total_xp FROM user_xp WHERE user_id = ?', [userId]);

    await connection.commit();

    return res.json({
      success: true,
      message: `Purchased ${item.item_name} for ${item.cost_xp} XP!`,
      itemCode: item.item_code,
      remainingXp: updatedXp[0]?.total_xp || 0
    });
  } catch (error) {
    await connection.rollback();
    console.error('Purchase Item Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to complete purchase.' });
  } finally {
    connection.release();
  }
}

module.exports = { getShopItems, purchaseItem };
