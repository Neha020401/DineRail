// ✅ backend/controllers/bookController.js using mysql2 (raw SQL)
const db = require('../config/db');

exports.createBooking = (req, res) => {
  const { trainNo, from, to, date, seatType } = req.body;
  const userId = req.user.id;

  const query = `INSERT INTO bookings (trainNo, from_station, to_station, date, seatType, userId) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [trainNo, from, to, date, seatType, userId];

  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ message: 'Server error', error: err });
    res.status(201).json({ id: result.insertId, trainNo, from, to, date, seatType });
  });
};

exports.getMyBookings = (req, res) => {
  const userId = req.user.id;
  db.query('SELECT * FROM bookings WHERE userId = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error', error: err });
    res.json(results);
  });
};
