// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticate = require('../middleware/auth');
const { bookTicket } = require('../controller/userController');

// Get available seats for a train on a specific date
router.get('/available-seats', async (req, res) => {
  const { train_no, travel_date } = req.query;

  if (!train_no || !travel_date) {
    return res.status(400).json({ message: 'Missing train_no or travel_date' });
  }

  const [trainRows] = await db.execute('SELECT total_seats FROM trains WHERE train_no = ?', [train_no]);
  if (trainRows.length === 0) return res.status(404).json({ message: 'Train not found' });

  const totalSeats = trainRows[0].total_seats;

  const [bookedRows] = await db.execute(
    'SELECT seat_number FROM bookings WHERE train_no = ? AND travel_date = ?',
    [train_no, travel_date]
  );

  const bookedSeats = bookedRows.map(row => row.seat_number);

  res.json({ totalSeats, bookedSeats });
});

// Book a ticket
router.post('/book', authenticate('USER'), bookTicket);

module.exports = router;