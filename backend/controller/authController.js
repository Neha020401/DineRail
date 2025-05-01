const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../models/db');


exports.userSignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = users[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, type: 'user' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

exports.providerSignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [providers] = await pool.query('SELECT * FROM providers WHERE email = ?', [email]);
    const provider = providers[0];
    if (!provider || !(await bcrypt.compare(password, provider.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: provider.id, type: 'provider' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};
