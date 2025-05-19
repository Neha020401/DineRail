// routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { authenticate } = require("../middleware/auth");

// Place food order (train or station vendor)
router.post("/order/place", authenticate("USER"), async (req, res) => {
  const {
    provider_id,
    food_item_id,
    quantity,
    train_no,
    train_name,
    seat_number,
  } = req.body;

  if (
    !provider_id ||
    !food_item_id ||
    !quantity ||
    !train_no ||
    !train_name ||
    !seat_number
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const [foodItem] = await db.execute(
      "SELECT price FROM food_items WHERE id = ?",
      [food_item_id]
    );
    if (!foodItem.length)
      return res.status(404).json({ message: "Food item not found" });

    const total_price = foodItem[0].price * quantity;
    const orderId = `order_${Date.now()}`;

    await db.execute(
      "INSERT INTO food_orders (id, user_id, provider_id, food_item_id, quantity, total_price, train_no, train_name, seat_number, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        orderId,
        req.user.id,
        provider_id,
        food_item_id,
        quantity,
        total_price,
        train_no,
        train_name,
        seat_number,
        "PLACED",
      ]
    );

    res.json({
      message: "Order placed successfully",
      order_id: orderId,
      total_price,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to place order" });
  }
});

router.get("/user", authenticate('USER'), async (req, res) => {
  try {
    const [orders] = await db.execute(`
      SELECT fo.*, fi.name AS food_name, fi.image_url
      FROM food_orders fo
      JOIN food_items fi ON fo.food_item_id = fi.id
      WHERE fo.user_id = ?
      ORDER BY fo.created_at DESC
    `, [req.user.id]);

    res.json(orders);
  } catch (err) {
    console.error("Error fetching user orders:", err);
    res.status(500).json({ error: "Failed to fetch user orders" });
  }
});

module.exports = router;
