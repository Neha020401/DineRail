// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticate = require('../middleware/auth');

// Place food order (train or station vendor)
router.post('/place', authenticate('USER'), async (req, res) => {
  const { provider_id, food_item_id, quantity, train_no, train_name, seat_number } = req.body;

  if (!provider_id || !food_item_id || !quantity || !train_no || !train_name || !seat_number) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const [foodItem] = await db.execute('SELECT price FROM food_items WHERE id = ?', [food_item_id]);
    if (!foodItem.length) return res.status(404).json({ message: 'Food item not found' });

    const total_price = foodItem[0].price * quantity;
    const orderId = `order_${Date.now()}`;

    await db.execute(
      'INSERT INTO food_orders (id, user_id, provider_id, food_item_id, quantity, total_price, train_no, train_name, seat_number, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [orderId, req.user.id, provider_id, food_item_id, quantity, total_price, train_no, train_name, seat_number, 'PLACED']
    );

    res.json({ message: 'Order placed successfully', order_id: orderId, total_price });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to place order' });
  }
});


// Submit review and comment for a completed order
router.patch('/:id/review', authenticate('USER'), async (req, res) => {
  const { id } = req.params;
  const { review, comment } = req.body;

  if (!review || review < 1 || review > 5) {
    return res.status(400).json({ message: 'Review must be between 1 and 5' });
  }

  try {
    const [existing] = await db.execute('SELECT * FROM food_orders WHERE id = ? AND user_id = ?', [id, req.user.id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Order not found or unauthorized' });
    }

    if (existing[0].status !== 'DELIVERED') {
      return res.status(400).json({ message: 'Can only review delivered orders' });
    }

    await db.execute(
      'UPDATE food_orders SET review = ?, comment = ? WHERE id = ?',
      [review, comment, id]
    );

    res.json({ message: 'Review submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

module.exports = router;
