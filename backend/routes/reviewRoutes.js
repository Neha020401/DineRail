const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticate = require('../middleware/auth'); // Make sure this exists and is working
const { v4: uuidv4 } = require('uuid');

// Apply authentication middleware to protect this route
router.patch('/:orderId/review', authenticate, async (req, res) => {
  const { review, comment } = req.body;
  const userId = req.user.id; // req.user is set by the authenticate middleware
  const { orderId } = req.params;

  try {
    const [[order]] = await db.execute(
      'SELECT food_item_id FROM food_orders WHERE id = ? AND user_id = ?',
      [orderId, userId]
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found or not authorized' });
    }

    // Upsert into food_reviews
    await db.execute(`
      INSERT INTO food_rating (id, user_id, food_item_id, rating, review_text)
      VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE rating = ?, review_text = ?, created_at = CURRENT_TIMESTAMP
    `, [uuidv4(), userId, order.food_item_id, review, comment, review, comment]);

    res.json({ message: 'Review submitted successfully' });
  } catch (err) {
    console.error('Review error:', err);
    res.status(500).json({ message: 'Failed to submit review' });
  }
});

module.exports = router;
