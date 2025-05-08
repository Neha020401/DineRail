// routes/foodRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

router.get("/", async (req, res) => {
  try {
    const [items] = await db.execute(`
      SELECT 
        fi.id,
        fi.name AS food_name,
        fi.provider_name,
        fi.price,
        fi.image_url,
        fi.description,
        p.train_name,
        p.train_number,
        p.station_name,
        p.provider_type,
        p.contact_number
      FROM food_items fi
      JOIN providers p ON fi.provider_id = p.id
    `);
    res.json(items);
  } catch (error) {
    console.error("Error fetching food items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id: foodId } = req.params;
  try {
    const [items] = await db.execute(
      `
      SELECT 
        fi.id,
        fi.name AS food_name,
        fi.provider_name,
        fi.price,
        fi.image_url,
        fi.description,
        p.train_name,
        p.train_number,
        p.station_name,
        p.provider_type,
        p.contact_number
      FROM food_items fi
      JOIN providers p ON fi.provider_id = p.id
      WHERE fi.id = ?
    `,
      [foodId]
    );

    if (items.length === 0) {
      return res.status(404).json({ error: "Food item not found" });
    }

    res.json(items[0]);
  } catch (error) {
    console.error("Error fetching food items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//FoodOrder api
router.post("food-items/place", async (req, res) => {
  const {
    food_item_id,
    provider_id,
    quantity,
    train_name,
    train_no,
    seat_number,
  } = req.body;
  const userId = req.user.id; // Assume you have authentication middleware that adds `req.user`

  try {
    const orderId = uuidv4();

    const [[foodItem]] = await db.execute(
      "SELECT price FROM food_items WHERE id = ?",
      [food_item_id]
    );

    if (!foodItem)
      return res.status(404).json({ message: "Food item not found" });

    const totalPrice = foodItem.price * quantity;

    await db.execute(
      `
      INSERT INTO food_orders (id, user_id, food_item_id, provider_id, quantity, total_price, train_name, train_number, seat_number)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderId,
        userId,
        food_item_id,
        provider_id,
        quantity,
        totalPrice,
        train_name,
        train_no,
        seat_number,
      ]
    );

    res.json({ order_id: orderId, total_price: totalPrice });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ message: "Failed to place order" });
  }
});

module.exports = router;
