// routes/foodRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");

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

module.exports = router;
