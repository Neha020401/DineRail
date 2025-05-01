// routes/providerRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticate = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Setup multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Get provider profile
router.get('/profile', authenticate('PROVIDER'), async (req, res) => {
  const [provider] = await db.execute('SELECT * FROM providers WHERE id = ?', [req.user.id]);
  res.json(provider[0]);
});

// Upload food item
router.post('/food', authenticate('PROVIDER'), upload.single('image'), async (req, res) => {
  const { name, description, price } = req.body;
  const image_url = req.file ? '/uploads/' + req.file.filename : null;

  if (!name || !price || !image_url) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  await db.execute(
    'INSERT INTO food_items (provider_id, name, description, price, image_url,cater_name) VALUES (?, ?, ?, ?, ?)',
    [req.user.id, name, description, price, image_url]
  );

  res.json({ message: 'Food item uploaded successfully' });
});

// Get provider's food items
router.get('/my-food', authenticate('PROVIDER'), async (req, res) => {
  const [items] = await db.execute('SELECT * FROM food_items WHERE provider_id = ?', [req.user.id]);
  res.json(items);
});

module.exports = router;