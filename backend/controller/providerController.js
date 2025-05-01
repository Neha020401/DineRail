// backend/controllers/providerController.js
const pool = require('../models/db');

exports.getProviderProfile = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM providers WHERE id = ?', [req.user.id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch provider profile' });
  }
};

exports.updateProviderProfile = async (req, res) => {
  const { name, gst_number, user_img, provider_type, station_name } = req.body;
  try {
    await pool.query('UPDATE providers SET name=?, gst_number=?, user_img=?, provider_type=?, station_name=? WHERE id=?', [name, gst_number, user_img, provider_type, station_name, req.user.id]);
    res.json({ message: 'Provider profile updated' });
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
};

exports.uploadFoodItem = async (req, res) => {
  const { name, description, price, image_url } = req.body;
  try {
    await pool.query('INSERT INTO food_items (provider_id, name, description, price, image_url) VALUES (?, ?, ?, ?, ?)', [req.user.id, name, description, price, image_url]);
    res.json({ message: 'Food item uploaded' });
  } catch (err) {
    res.status(500).json({ error: 'Upload failed' });
  }
};

exports.getProviderOrders = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM food_orders WHERE provider_id = ?', [req.user.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get orders' });
  }
};

