// backend/controllers/userController.js
const pool = require('../models/db');

exports.getUserProfile = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.user.id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

exports.updateUserProfile = async (req, res) => {
  const { name, phone, dob, aadhar, user_img } = req.body;
  try {
    await pool.query('UPDATE users SET name=?, phone_no=?, dob=?, aadhar_card=?, user_img=? WHERE id=?', [name, phone, dob, aadhar, user_img, req.user.id]);
    res.json({ message: 'Profile updated' });
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM bookings WHERE user_id = ?', [req.user.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get bookings' });
  }
};

exports.bookTicket = async (req, res) => {
  const { train_from, train_to, fare, date, seat_no, train_id } = req.body;
  try {
    await pool.query('INSERT INTO bookings (user_id, train_from, train_to, fare, date, seat_no, train_id) VALUES (?, ?, ?, ?, ?, ?, ?)', [req.user.id, train_from, train_to, fare, date, seat_no, train_id]);
    res.json({ message: 'Ticket booked' });
  } catch (err) {
    res.status(500).json({ error: 'Booking failed' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM food_orders WHERE user_id = ?', [req.user.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get orders' });
  }
};

exports.orderFood = async (req, res) => {
  const { food_id, train_name, train_no, seat_no } = req.body;
  try {
    await pool.query('INSERT INTO food_orders (user_id, food_id, train_name, train_no, seat_no) VALUES (?, ?, ?, ?, ?)', [req.user.id, food_id, train_name, train_no, seat_no]);
    res.json({ message: 'Food ordered' });
  } catch (err) {
    res.status(500).json({ error: 'Order failed' });
  }
};