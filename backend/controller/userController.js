// backend/controllers/userController.js
const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

exports.getUserProfile = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [req.user.id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

exports.updateUserProfile = async (req, res) => {
  const { name, phone, dob, aadhar, user_img } = req.body;
  try {
    await pool.execute('UPDATE users SET name=?, phone_no=?, dob=?, aadhar_card=?, user_img=? WHERE id=?', [name, phone, dob, aadhar, user_img, req.user.id]);
    res.json({ message: 'Profile updated' });
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM bookings WHERE user_id = ?', [req.user.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get bookings' });
  }
};

exports.bookTicket = async (req, res) => {
  const { train_from, train_to, fare, date, seat_type, train_id, passengers } = req.body;

  const bookingId = uuidv4();

  try {
    await pool.execute(
      `INSERT INTO bookings (id, user_id, train_from, train_to, fare, date, seat_type, train_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [bookingId, req.user.id, train_from, train_to, fare, date, seat_type, train_id]
    );

    for (const p of passengers) {
      const passengerId = uuidv4();
      await pool.execute(
        `INSERT INTO passengers (id, booking_id, name, age, gender, address)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [passengerId, bookingId, p.name, p.age, p.gender, p.address]
      );
    }

    res.json({ message: '✅ Ticket booked successfully!', bookingId });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '❌ Booking failed. Please try again.' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM food_orders WHERE user_id = ?', [req.user.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get orders' });
  }
};

exports.orderFood = async (req, res) => {
  const { food_id, train_name, train_no, seat_no } = req.body;
  try {
    await pool.execute('INSERT INTO food_orders (user_id, food_id, train_name, train_no, seat_no) VALUES (?, ?, ?, ?, ?)', [req.user.id, food_id, train_name, train_no, seat_no]);
    res.json({ message: 'Food ordered' });
  } catch (err) {
    res.status(500).json({ error: 'Order failed' });
  }
};