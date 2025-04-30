const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Create a new booking
router.post('/create', (req, res) => {
  const { user_id, train_no, from_station, to_station, date, seat_type } = req.body;

  const sql = `
    INSERT INTO bookings (user_id, train_no, from_station, to_station, date, seat_type)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [user_id, train_no, from_station, to_station, date, seat_type];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Booking insert error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: "Booking created", bookingId: result.insertId });
  });
});

module.exports = router;
