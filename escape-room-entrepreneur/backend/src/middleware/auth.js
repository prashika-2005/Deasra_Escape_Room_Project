const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  // 1. Check Session first
  if (req.session && req.session.userId) {
    req.user = { id: req.session.userId, username: req.session.username };
    return next();
  }

  // 2. Check Authorization Header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication required. Please log in.' });
  }

  const secret = process.env.JWT_SECRET || 'supersecret_key_escape_room_2026_key';
  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid or expired session token.' });
    }
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
