const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

// Register User
async function register(req, res) {
  const connection = await pool.getConnection();
  try {
    const {
      fullName,
      username,
      email,
      password,
      avatarId,
      collegeName,
      branch,
      yearOfStudy,
      studentId
    } = req.body;

    if (!fullName || !username || !email || !collegeName || !branch || !yearOfStudy || !studentId) {
      return res.status(400).json({ success: false, message: 'All required registration fields must be provided.' });
    }

    const effectivePassword = password || 'student_default_pass_2026';
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(effectivePassword, saltRounds);

    // Check duplicate username, email, or student roll
    const [existing] = await connection.execute(
      'SELECT id, username, email, student_roll_no FROM users WHERE username = ? OR email = ? OR student_roll_no = ?',
      [username, email, studentId]
    );

    if (existing.length > 0) {
      const match = existing[0];
      if (match.username === username) {
        return res.status(409).json({ success: false, message: 'Username is already taken.' });
      }
      if (match.email === email) {
        return res.status(409).json({ success: false, message: 'Email address is already registered.' });
      }
      if (match.student_roll_no === studentId) {
        return res.status(409).json({ success: false, message: 'Student Roll No / ID is already registered.' });
      }
    }

    await connection.beginTransaction();

    const userId = 'ENTR_' + Math.floor(100000 + Math.random() * 900000);
    const selectedAvatar = avatarId || 'creator';

    // 1. Insert into users
    await connection.execute(
      `INSERT INTO users 
        (id, full_name, username, email, password_hash, avatar_id, college_university, department, year_of_study, student_roll_no)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, fullName, username, email, passwordHash, selectedAvatar, collegeName, branch, yearOfStudy, studentId]
    );

    // 2. Initialize user_xp
    await connection.execute(
      `INSERT INTO user_xp (user_id, video_xp, quiz_xp, activity_xp, streak_xp, spend_xp, total_xp)
       VALUES (?, 0, 0, 0, 0, 0, 0)`,
      [userId]
    );

    // 3. Initialize room_module_progress (Room 1 = available, Rooms 2-5 = locked)
    const rooms = [
      { id: 1, status: 'available' },
      { id: 2, status: 'locked' },
      { id: 3, status: 'locked' },
      { id: 4, status: 'locked' },
      { id: 5, status: 'locked' }
    ];

    for (const r of rooms) {
      await connection.execute(
        `INSERT INTO room_module_progress (user_id, module_id, status, progress_pct, state_data)
         VALUES (?, ?, ?, 0, ?)`,
        [userId, r.id, r.status, JSON.stringify({})]
      );
    }

    await connection.commit();

    // Create Token
    const secret = process.env.JWT_SECRET || 'supersecret_key_escape_room_2026_key';
    const token = jwt.sign({ id: userId, username, email }, secret, { expiresIn: '7d' });

    if (req.session) {
      req.session.userId = userId;
      req.session.username = username;
    }

    return res.status(201).json({
      success: true,
      message: 'Student registration successful!',
      token,
      user: {
        id: userId,
        fullName,
        username,
        email,
        avatarId: selectedAvatar,
        collegeName,
        branch,
        yearOfStudy,
        studentId
      }
    });
  } catch (error) {
    await connection.rollback();
    console.error('Registration Error:', error);
    return res.status(500).json({ success: false, message: 'Server error during registration.', error: error.message });
  } finally {
    connection.release();
  }
}

// Login User
async function login(req, res) {
  try {
    const { username, email, password } = req.body;
    const loginIdentifier = username || email;

    if (!loginIdentifier) {
      return res.status(400).json({ success: false, message: 'Username or Email is required.' });
    }

    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [loginIdentifier, loginIdentifier]
    );

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid username or password.' });
    }

    const user = rows[0];

    // Verify password if password provided
    if (password && user.password_hash) {
      const valid = await bcrypt.compare(password, user.password_hash);
      if (!valid) {
        return res.status(401).json({ success: false, message: 'Invalid username or password.' });
      }
    }

    const secret = process.env.JWT_SECRET || 'supersecret_key_escape_room_2026_key';
    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, secret, { expiresIn: '7d' });

    if (req.session) {
      req.session.userId = user.id;
      req.session.username = user.username;
    }

    return res.json({
      success: true,
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        username: user.username,
        email: user.email,
        avatarId: user.avatar_id,
        collegeName: user.college_university,
        branch: user.department,
        yearOfStudy: user.year_of_study,
        studentId: user.student_roll_no
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ success: false, message: 'Server error during login.', error: error.message });
  }
}

// Logout
async function logout(req, res) {
  if (req.session) {
    req.session.destroy();
  }
  return res.json({ success: true, message: 'Successfully logged out.' });
}

// Get Authenticated User Profile
async function getProfile(req, res) {
  try {
    const userId = req.user.id;
    const [users] = await pool.execute('SELECT * FROM users WHERE id = ?', [userId]);

    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'User profile not found.' });
    }

    const user = users[0];
    const [xpRows] = await pool.execute('SELECT * FROM user_xp WHERE user_id = ?', [userId]);
    const xpData = xpRows[0] || { total_xp: 0 };

    return res.json({
      success: true,
      user: {
        id: user.id,
        fullName: user.full_name,
        username: user.username,
        email: user.email,
        avatarId: user.avatar_id,
        collegeName: user.college_university,
        branch: user.department,
        yearOfStudy: user.year_of_study,
        studentId: user.student_roll_no,
        totalXp: xpData.total_xp || 0
      }
    });
  } catch (error) {
    console.error('Get Profile Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve user profile.' });
  }
}

// Update Profile
async function updateProfile(req, res) {
  try {
    const userId = req.user.id;
    const { fullName, avatarId, collegeName, branch, yearOfStudy } = req.body;

    await pool.execute(
      `UPDATE users 
       SET full_name = COALESCE(?, full_name),
           avatar_id = COALESCE(?, avatar_id),
           college_university = COALESCE(?, college_university),
           department = COALESCE(?, department),
           year_of_study = COALESCE(?, year_of_study)
       WHERE id = ?`,
      [fullName, avatarId, collegeName, branch, yearOfStudy, userId]
    );

    return res.json({ success: true, message: 'Profile updated successfully.' });
  } catch (error) {
    console.error('Update Profile Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update profile.' });
  }
}

module.exports = {
  register,
  login,
  logout,
  getProfile,
  updateProfile
};
