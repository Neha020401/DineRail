// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticate = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');

// Dummy payment endpoint
router.post('/pay', authenticate('USER'), async (req, res) => {
  const { booking_id, amount } = req.body;

  if (!booking_id || !amount) {
    return res.status(400).json({ message: 'Missing booking_id or amount' });
  }

  const payment_id = uuidv4();
  const status = 'SUCCESS';

  await db.execute(
    'INSERT INTO payments (payment_id, booking_id, user_id, amount, status) VALUES (?, ?, ?, ?, ?)',
    [payment_id, booking_id, req.user.id, amount, status]
  );

  res.json({ message: 'Payment successful', payment_id });
});

module.exports = router;