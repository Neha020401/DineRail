// ✅ backend/controllers/paymentController.js using dummy payment logic
const db = require('../config/db');

exports.createOrder = (req, res) => {
  const { amount, currency = 'INR' } = req.body;
  const dummyOrder = {
    id: `order_${Math.floor(Math.random() * 1000000)}`,
    amount,
    currency,
    status: 'created'
  };
  res.json(dummyOrder);
};

exports.paymentSuccess = (req, res) => {
  const { bookingId, paymentId, status } = req.body;

  db.query(
    'INSERT INTO payments (bookingId, paymentId, status) VALUES (?, ?, ?)',
    [bookingId, paymentId, status],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Server error', error: err });
      res.status(201).json({ id: result.insertId, bookingId, paymentId, status });
    }
  );
};
