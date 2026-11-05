const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./src/routes/authRoutes');
const roomRoutes = require('./src/routes/roomRoutes');
const puzzleRoutes = require('./src/routes/puzzleRoutes');
const xpRoutes = require('./src/routes/xpRoutes');
const inventoryRoutes = require('./src/routes/inventoryRoutes');
const shopRoutes = require('./src/routes/shopRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'escape_room_session_secret_98765',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

// Health-check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    system: 'Escape Room Backend API Engine',
    timestamp: new Date().toISOString()
  });
});

// API Routes Mount
app.use('/api', authRoutes);
app.use('/api', roomRoutes);
app.use('/api', puzzleRoutes);
app.use('/api', xpRoutes);
app.use('/api', inventoryRoutes);
app.use('/api', shopRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
});

app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 Escape Room Backend API running on port ${PORT}`);
  console.log(`👉 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`==================================================\n`);
});
