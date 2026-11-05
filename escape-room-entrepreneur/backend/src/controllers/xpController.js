const pool = require('../config/db');

// Get User XP Summary
async function getXP(req, res) {
  try {
    const userId = req.user.id;
    const [rows] = await pool.execute('SELECT * FROM user_xp WHERE user_id = ?', [userId]);

    if (rows.length === 0) {
      return res.json({
        success: true,
        xp: { videoXp: 0, quizXp: 0, activityXp: 0, streakXp: 0, spendXp: 0, totalXp: 0 }
      });
    }

    const x = rows[0];
    return res.json({
      success: true,
      xp: {
        videoXp: x.video_xp,
        quizXp: x.quiz_xp,
        activityXp: x.activity_xp,
        streakXp: x.streak_xp,
        spendXp: x.spend_xp,
        totalXp: x.total_xp
      }
    });
  } catch (error) {
    console.error('Get XP Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve XP summary.' });
  }
}

// Get XP Audit Transactions History
async function getXPTransactions(req, res) {
  try {
    const userId = req.user.id;
    const [rows] = await pool.execute(
      'SELECT id, xp_type, xp_amount, source_id, source_name, created_at FROM xp_transactions WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return res.json({ success: true, transactions: rows });
  } catch (error) {
    console.error('Get XP Transactions Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve XP transactions.' });
  }
}

// Award XP (Server Validation & Atomic DB Transaction)
async function awardXP(req, res) {
  const connection = await pool.getConnection();
  try {
    const userId = req.user.id;
    const { xpCategory, amount, sourceId, sourceName } = req.body;

    if (!xpCategory || !amount || !sourceId) {
      return res.status(400).json({ success: false, message: 'xpCategory, amount, and sourceId are required.' });
    }

    const catUpper = String(xpCategory).toUpperCase();
    const validCats = ['VIDEO', 'QUIZ', 'ACTIVITY', 'STREAK'];
    if (!validCats.includes(catUpper)) {
      return res.status(400).json({ success: false, message: 'Invalid XP category.' });
    }

    await connection.beginTransaction();

    // Check duplicate claim for this sourceId
    const [existing] = await connection.execute(
      'SELECT id FROM xp_transactions WHERE user_id = ? AND source_id = ? AND xp_type = ?',
      [userId, sourceId, catUpper]
    );

    if (existing.length > 0) {
      await connection.rollback();
      return res.status(409).json({ success: false, message: 'XP already awarded for this activity.' });
    }

    const xpAmount = Math.max(1, parseInt(amount, 10));

    // 1. Insert Transaction
    await connection.execute(
      `INSERT INTO xp_transactions (user_id, xp_type, xp_amount, source_id, source_name)
       VALUES (?, ?, ?, ?, ?)`,
      [userId, catUpper, xpAmount, sourceId, sourceName || sourceId]
    );

    // 2. Update Column based on category
    let colName = 'activity_xp';
    if (catUpper === 'VIDEO') colName = 'video_xp';
    if (catUpper === 'QUIZ') colName = 'quiz_xp';
    if (catUpper === 'STREAK') colName = 'streak_xp';

    await connection.execute(
      `UPDATE user_xp 
       SET ${colName} = ${colName} + ?,
           total_xp = video_xp + quiz_xp + activity_xp + streak_xp - spend_xp
       WHERE user_id = ?`,
      [xpAmount, userId]
    );

    // 3. Fetch updated total
    const [updatedXp] = await connection.execute(
      'SELECT total_xp FROM user_xp WHERE user_id = ?',
      [userId]
    );

    await connection.commit();

    return res.json({
      success: true,
      message: `Awarded ${xpAmount} ${catUpper} XP!`,
      xpAwarded: xpAmount,
      totalXp: updatedXp[0]?.total_xp || 0
    });
  } catch (error) {
    await connection.rollback();
    console.error('Award XP Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to award XP.' });
  } finally {
    connection.release();
  }
}

// Get Leaderboard
async function getLeaderboard(req, res) {
  try {
    const [rows] = await pool.execute(
      `SELECT u.id, u.full_name, u.username, u.avatar_id, u.college_university, x.total_xp
       FROM users u
       JOIN user_xp x ON u.id = x.user_id
       ORDER BY x.total_xp DESC
       LIMIT 20`
    );

    const leaderboard = rows.map((r, idx) => ({
      rank: idx + 1,
      name: r.full_name,
      username: r.username,
      avatarId: r.avatar_id,
      college: r.college_university,
      totalXp: r.total_xp
    }));

    return res.json({ success: true, leaderboard });
  } catch (error) {
    console.error('Get Leaderboard Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve leaderboard.' });
  }
}

module.exports = {
  getXP,
  getXPTransactions,
  awardXP,
  getLeaderboard
};
