// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticate = require('../middleware/auth');

// Place food order (train or station vendor)
router.post('/place', authenticate('USER'), async (req, res) => {
  const { provider_id, food_item_id, quantity, delivery_mode, train_no, train_name, seat_number } = req.body;

  if (!provider_id || !food_item_id || !quantity || !delivery_mode || !train_no || !train_name || !seat_number) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const [foodItemRows] = await db.execute('SELECT price FROM food_items WHERE id = ?', [food_item_id]);
  if (foodItemRows.length === 0) return res.status(404).json({ message: 'Food item not found' });

  const total_price = foodItemRows[0].price * quantity;

  await db.execute(
    'INSERT INTO food_orders (user_id, provider_id, food_item_id, quantity, total_price, delivery_mode, train_no, train_name, seat_number, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [req.user.id, provider_id, food_item_id, quantity, total_price, delivery_mode, train_no, train_name, seat_number, 'PENDING']
  );

  res.json({ message: 'Order placed successfully', total_price });
});

module.exports = router;