const pool = require('../config/db');

// Get All Rooms & User Unlocking Progress
async function getRooms(req, res) {
  try {
    const userId = req.user.id;
    const [rows] = await pool.execute(
      'SELECT module_id, status, progress_pct, state_data, updated_at FROM room_module_progress WHERE user_id = ? ORDER BY module_id ASC',
      [userId]
    );

    const roomMap = {};
    rows.forEach(r => {
      let parsedState = {};
      try {
        parsedState = typeof r.state_data === 'string' ? JSON.parse(r.state_data) : (r.state_data || {});
      } catch (e) {}

      roomMap[r.module_id] = {
        id: r.module_id,
        status: r.status,
        progress: r.progress_pct,
        stateData: parsedState
      };
    });

    return res.json({ success: true, rooms: roomMap });
  } catch (error) {
    console.error('Get Rooms Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve room progress.' });
  }
}

// Get Specific Room Progress
async function getRoomProgress(req, res) {
  try {
    const userId = req.user.id;
    const moduleId = parseInt(req.params.moduleId, 10);

    const [rows] = await pool.execute(
      'SELECT module_id, status, progress_pct, state_data FROM room_module_progress WHERE user_id = ? AND module_id = ?',
      [userId, moduleId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Room progress record not found.' });
    }

    const r = rows[0];
    let parsedState = {};
    try {
      parsedState = typeof r.state_data === 'string' ? JSON.parse(r.state_data) : (r.state_data || {});
    } catch (e) {}

    return res.json({
      success: true,
      room: {
        id: r.module_id,
        status: r.status,
        progress: r.progress_pct,
        stateData: parsedState
      }
    });
  } catch (error) {
    console.error('Get Room Progress Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve room progress.' });
  }
}

// Update Room Progress / Save Room State
async function updateRoomProgress(req, res) {
  try {
    const userId = req.user.id;
    const moduleId = parseInt(req.params.moduleId, 10);
    const { status, progressPct, stateData } = req.body;

    const stateJson = stateData ? JSON.stringify(stateData) : null;

    await pool.execute(
      `INSERT INTO room_module_progress (user_id, module_id, status, progress_pct, state_data)
       VALUES (?, ?, COALESCE(?, 'available'), COALESCE(?, 0), ?)
       ON DUPLICATE KEY UPDATE
         status = COALESCE(?, status),
         progress_pct = COALESCE(?, progress_pct),
         state_data = COALESCE(?, state_data)`,
      [userId, moduleId, status, progressPct, stateJson, status, progressPct, stateJson]
    );

    return res.json({ success: true, message: 'Room progress updated.' });
  } catch (error) {
    console.error('Update Room Progress Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update room progress.' });
  }
}

// Complete Room & Unlock Specialized Chambers
async function completeRoom(req, res) {
  const connection = await pool.getConnection();
  try {
    const userId = req.user.id;
    const moduleId = parseInt(req.params.moduleId, 10);

    await connection.beginTransaction();

    // 1. Mark target room as completed
    await connection.execute(
      `INSERT INTO room_module_progress (user_id, module_id, status, progress_pct)
       VALUES (?, ?, 'completed', 100)
       ON DUPLICATE KEY UPDATE status = 'completed', progress_pct = 100`,
      [userId, moduleId]
    );

    // 2. If Room 1 completed -> Unlock Rooms 2, 3, 4, 5
    if (moduleId === 1) {
      const specializedRoomIds = [2, 3, 4, 5];
      for (const sId of specializedRoomIds) {
        await connection.execute(
          `INSERT INTO room_module_progress (user_id, module_id, status, progress_pct)
           VALUES (?, ?, 'available', 0)
           ON DUPLICATE KEY UPDATE status = IF(status = 'locked', 'available', status)`,
          [userId, sId]
        );
      }
    }

    await connection.commit();

    return res.json({
      success: true,
      message: `Room ${moduleId} marked as completed. Specialized rooms unlocked!`,
      nextUnlocked: moduleId === 1 ? [2, 3, 4, 5] : []
    });
  } catch (error) {
    await connection.rollback();
    console.error('Complete Room Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to complete room.' });
  } finally {
    connection.release();
  }
}

module.exports = {
  getRooms,
  getRoomProgress,
  updateRoomProgress,
  completeRoom
};
