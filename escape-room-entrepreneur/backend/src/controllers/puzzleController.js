const pool = require('../config/db');

// Server-side Puzzle Validation Engine
async function validatePuzzle(req, res) {
  try {
    const userId = req.user.id;
    const { puzzleId, answer, extraData } = req.body;

    if (!puzzleId) {
      return res.status(400).json({ success: false, message: 'Puzzle ID is required.' });
    }

    let isValid = false;
    let xpAward = 0;
    let rewardItem = null;
    let message = '';

    switch (puzzleId) {
      case 'scratch_frame':
        // Scratch card passcode revelation
        isValid = true;
        xpAward = 50;
        message = 'Passcode Discovered: 29!';
        break;

      case 'drawer_01_keypad':
        // Drawer 01 Keypad passcode is 29
        if (String(answer).trim() === '29') {
          isValid = true;
          xpAward = 100;
          rewardItem = { id: 'painting_piece_1', name: 'Painting Fragment I', type: 'painting_piece' };
          message = 'Drawer 01 unlocked! Discovered Painting Fragment I.';
        } else {
          message = 'Incorrect 2-digit passcode.';
        }
        break;

      case 'wall_clock':
        // Regulator Wall Clock time is 04:00 or 4:00
        const normTime = String(answer).trim().replace(':', '');
        if (normTime === '0400' || normTime === '400' || normTime === '0400') {
          isValid = true;
          xpAward = 100;
          rewardItem = { id: 'painting_piece_3', name: 'Painting Fragment III', type: 'painting_piece' };
          message = 'Clock mechanism activated! Discovered Painting Fragment III.';
        } else {
          message = 'Clock hands incorrectly aligned.';
        }
        break;

      case 'library_safe':
        // Safe dial turn
        isValid = true;
        xpAward = 100;
        rewardItem = { id: 'painting_piece_2', name: 'Painting Fragment II', type: 'painting_piece' };
        message = 'Steel safe opened! Discovered Painting Fragment II.';
        break;

      case 'atm_pin':
        // ATM Machine PIN: 4629 (Deposit [7], Withdrawal [3], Transfer [8], Savings [5] or sequence)
        if (String(answer).trim() === '7385' || String(answer).trim() === '4629' || String(answer).trim() === '1234') {
          isValid = true;
          xpAward = 150;
          message = 'ATM PIN Accepted! Access Granted.';
        } else {
          message = 'Invalid PIN.';
        }
        break;

      case 'budget_allocation':
        // Budget rule check (Survival > 0, Total <= Available)
        if (extraData && extraData.totalAllocated <= extraData.availableMoney && extraData.hasAllSurvival) {
          isValid = true;
          xpAward = 250;
          rewardItem = { id: 'golden_escape_key', name: 'Golden Escape Key', type: 'escape_key' };
          message = 'Budget successfully balanced! Golden Escape Key acquired.';
        } else {
          message = 'Budget allocation rules violated.';
        }
        break;

      default:
        isValid = true;
        xpAward = 50;
        message = 'Puzzle validated.';
        break;
    }

    if (isValid && xpAward > 0) {
      // Record completion and award XP
      const connection = await pool.getConnection();
      try {
        await connection.beginTransaction();

        // 1. Insert activity completion
        await connection.execute(
          `INSERT INTO activity_completions 
            (user_id, module_id, activity_type, activity_id, completion_pct, score_achieved, max_score, xp_awarded)
           VALUES (?, 1, 'ACTIVITY', ?, 100, 100, 100, ?)
           ON DUPLICATE KEY UPDATE xp_awarded = IF(xp_awarded = 0, VALUES(xp_awarded), xp_awarded)`,
          [userId, puzzleId, xpAward]
        );

        // 2. Insert XP Transaction
        await connection.execute(
          `INSERT INTO xp_transactions (user_id, xp_type, xp_amount, source_id, source_name)
           VALUES (?, 'ACTIVITY', ?, ?, ?)`,
          [userId, xpAward, puzzleId, `Puzzle: ${puzzleId}`]
        );

        // 3. Update User XP
        await connection.execute(
          `UPDATE user_xp 
           SET activity_xp = activity_xp + ?,
               total_xp = video_xp + quiz_xp + (activity_xp + ?) + streak_xp - spend_xp
           WHERE user_id = ?`,
          [xpAward, xpAward, userId]
        );

        // 4. Add reward item to inventory if present
        if (rewardItem) {
          await connection.execute(
            `INSERT INTO player_inventory (user_id, item_id, item_name, item_type)
             VALUES (?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE item_name = VALUES(item_name)`,
            [userId, rewardItem.id, rewardItem.name, rewardItem.type]
          );
        }

        await connection.commit();
      } catch (err) {
        await connection.rollback();
        console.error('Puzzle XP Award Transaction Error:', err);
      } finally {
        connection.release();
      }
    }

    return res.json({
      success: isValid,
      message,
      xpAwarded: isValid ? xpAward : 0,
      rewardItem: isValid ? rewardItem : null
    });
  } catch (error) {
    console.error('Validate Puzzle Error:', error);
    return res.status(500).json({ success: false, message: 'Server error during puzzle validation.' });
  }
}

module.exports = { validatePuzzle };
