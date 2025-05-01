// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const authController = require('../controller/authController');

require('dotenv').config(); // make sure this is at the top
const JWT_SECRET = process.env.JWT_SECRET;



// User login
router.post('/user-signin', authController.userSignIn);

// Provider login
router.post('/provider-signin', authController.providerSignIn);

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

  if (users.length === 0) return res.status(400).json({ message: 'User not found' });

  const user = users[0];
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, role: 'USER' }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user });
}

// USER LOGIN
router.post('/user/login', userLogin);

// PROVIDER LOGIN
router.post('/provider/login', async (req, res) => {
  const { email, password } = req.body;
  const [providers] = await db.execute('SELECT * FROM providers WHERE email = ?', [email]);

  if (providers.length === 0) return res.status(400).json({ message: 'Provider not found' });

  const provider = providers[0];
  const isMatch = await bcrypt.compare(password, provider.password);

  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: provider.id, role: 'PROVIDER' }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, provider });
});

// LOGOUT (Frontend just deletes token, backend may blacklist if required)
router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// USER SIGNUP
router.post('/user/signup', async (req, res) => {
    try {
      const { name, email, password, phoneno, dob, aadhar_card } = req.body;
  
      // Check if user already exists
      const [existing] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
      if (existing.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await db.execute(
        'INSERT INTO users (name, email, password, phone_no, dob, aadhar_card) VALUES (?, ?, ?)',
        [name, email, hashedPassword, phoneno, dob, aadhar_card]
      );
  
      const userId = result.insertId;
      const token = jwt.sign({ id: userId, role: 'USER' }, process.env.JWT_SECRET, { expiresIn: '1d' });
  
      res.status(201).json({
        token,
        user: { id: userId, name, email, role: 'USER' },
      });
    } catch (error) {
      console.error('User Signup Error:', error);
      res.status(500).json({ message: 'Server error during user signup' });
    }
  });
  
  // PROVIDER SIGNUP
  router.post('/provider/signup', async (req, res) => {
    try {
      const { name, email, password, service_type, contact_number } = req.body;
  
      const [existing] = await db.execute('SELECT * FROM providers WHERE email = ?', [email]);
      if (existing.length > 0) {
        return res.status(400).json({ message: 'Provider already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await db.execute(
        'INSERT INTO providers (name, email, password, service_type, contact_number) VALUES (?, ?, ?, ?, ?)',
        [name, email, hashedPassword, service_type, contact_number]
      );
  
      const providerId = result.insertId;
      const token = jwt.sign({ id: providerId, role: 'PROVIDER' }, process.env.JWT_SECRET, { expiresIn: '1d' });
  
      res.status(201).json({
        token,
        provider: { id: providerId, name, email, role: 'PROVIDER', service_type, contact_number },
      });
    } catch (error) {
      console.error('Provider Signup Error:', error);
      res.status(500).json({ message: 'Server error during provider signup' });
    }
  });
  
module.exports = router;


