const express = require('express');
const router = express.Router();
const db = require('../config/db');
const {authenticate} = require('../middleware/auth'); // Make sure this exists and is working
const { v4: uuidv4 } = require('uuid');

// Apply authentication middleware to protect this route
router.patch("/:food_item_id", authenticate("USER"), async (req, res) => {
  const { food_item_id } = req.params;
  const { review, comment } = req.body;

  if (review === undefined || comment === undefined) {
    return res.status(400).json({ message: "Review and comment are required" });
  }

  try {
    // Check if the user ordered this item
    const [existingOrders] = await db.execute(
      "SELECT * FROM food_orders WHERE food_item_id = ? AND user_id = ?",
      [food_item_id, req.user.id]
    );

    if (existingOrders.length === 0) {
      return res.status(404).json({ message: "You haven't ordered this item." });
    }

    const orderId = existingOrders[0].id;

    // Check if a review already exists for this user and food item
    const [existingReview] = await db.execute(
      "SELECT * FROM food_rating WHERE user_id = ? AND food_item_id = ?",
      [req.user.id, food_item_id]
    );

    if (existingReview.length > 0) {
      return res.status(400).json({ message: "You have already reviewed this item." });
    }

    const ratingId = uuidv4(); // Generate a new ID

    // Insert new review
    await db.execute(
      `INSERT INTO food_rating (id, user_id, food_item_id, comment, review, order_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [ratingId, req.user.id, food_item_id, comment, review, orderId]
    );

    res.json({ message: "Review submitted successfully" });
  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).json({ message: "Failed to submit review", error: error.message });
  }
});

router.get("/:food_item_id", async (req, res) => {
  const { food_item_id } = req.params;

  try {
    const [reviews] = await db.execute(`
      SELECT fr.review, fr.comment, fr.id AS review_id, u.name, u.user_img
      FROM food_rating fr
      JOIN users u ON fr.user_id = u.id
      WHERE fr.food_item_id = ?
      ORDER BY fr.id DESC
    `, [food_item_id]);

    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
});

module.exports = router;
