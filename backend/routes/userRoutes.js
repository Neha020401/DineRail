// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticate = require('../middleware/auth');

// Get user profile
router.get('/profile', authenticate('USER'), async (req, res) => {
  const [user] = await db.execute('SELECT * FROM users WHERE id = ?', [req.user.id]);
  res.json(user[0]);
});

// Get user bookings
router.get('/bookings', authenticate('USER'), async (req, res) => {
  const [bookings] = await db.execute('SELECT * FROM bookings WHERE user_id = ?', [req.user.id]);
  res.json(bookings);
});

// Get user food orders
router.get('/orders', authenticate('USER'), async (req, res) => {
  const [orders] = await db.execute(
    'SELECT * FROM food_orders WHERE user_id = ?',
    [req.user.id]
  );
  res.json(orders);
});

module.exports = router;