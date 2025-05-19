// routes/foodRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const  { authenticate, verifyProvider } = require("../middleware/auth");

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
     console.log(foodId);
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


// Fetch all food items for the logged-in provider
router.post("/provider", verifyProvider, async (req, res) => {
  try {
    const [items] = await db.execute(
      `
      SELECT id, name, description, price, image_url, created_at
      FROM food_items
      WHERE provider_id = ?
      ORDER BY created_at DESC
      `,
      [req.body.id]
    );
    res.json(items);
  } catch (error) {
    console.error("Error fetching provider's food items:", error);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// Delete a specific food item by ID
router.delete("/:id", verifyProvider, async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute(
      "DELETE FROM food_items WHERE id = ? AND provider_id = ?",
      [id, req.user.id]
    );
    res.json({ message: "Food item deleted" });
  } catch (error) {
    console.error("Error deleting food item:", error);
    res.status(500).json({ error: "Delete failed" });
  }
});


module.exports = router;
