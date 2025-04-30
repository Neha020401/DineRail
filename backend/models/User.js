const db = require('../config/db');  // Import your db connection

// Register User (Example)
const createUser = async (name, email, password) => {
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  const [result] = await db.promise().query(query, [name, email, password]);
  return result;
};

// Find User by Email
const findUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  const [rows] = await db.promise().query(query, [email]);
  return rows[0];  // Return the first match
};

module.exports = { createUser, findUserByEmail };
