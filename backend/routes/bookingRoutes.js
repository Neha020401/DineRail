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


// Get booking details for logged-in user
router.get('/bookingDetail', authenticate, async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch bookings with passengers and payment details
        const query = `
            SELECT b.id, b.train_from, b.train_to, b.fare, b.date, b.seat_type, b.train_id, b.created_at,
                   p.name AS passenger_name, p.age, p.gender, p.address, 
                   pay.amount, pay.status
            FROM bookings AS b
            LEFT JOIN passengers AS p ON b.id = p.booking_id
            LEFT JOIN payments AS pay ON b.id = pay.booking_id
            WHERE b.user_id = ?;
        `;
        const [rows] = await db.execute(query, [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No bookings found' });
        }

        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router;