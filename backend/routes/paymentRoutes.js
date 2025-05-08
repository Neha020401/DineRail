// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticate = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');

// Dummy payment endpoint
router.post('ticket/pay', authenticate('USER'), async (req, res) => {
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

// routes/foodpaymentRoutes.js
router.post('food/pay', async (req, res) => {
  const { booking_id, amount } = req.body;
  const userId = req.user.id;

  try {
    const [[order]] = await db.execute('SELECT food_item_id FROM food_orders WHERE id = ?', [booking_id]);

    if (!order) return res.status(404).json({ message: 'Order not found' });

    const [[foodItem]] = await db.execute('SELECT name FROM food_items WHERE id = ?', [order.food_item_id]);

    await db.execute(`
      INSERT INTO food_payments (id, order_id, user_id, food_item_id, food_name, payment_amount, payment_status, payment_method)
      VALUES (?, ?, ?, ?, ?, ?, 'SUCCESS', 'Online')
    `, [uuidv4(), booking_id, userId, order.food_item_id, foodItem.name, amount]);

    res.json({ message: 'Payment successful' });
  } catch (err) {
    console.error('Payment error:', err);
    res.status(500).json({ message: 'Payment failed' });
  }
});

module.exports = router;