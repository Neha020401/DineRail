// backend/config/db.js
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();
console.log("Your Mysql user is " + process.env.MYSQL_USER)

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root', 
  password: process.env.MYSQL_PASSWORD, 
  database: process.env.MYSQL_DATABASE, 
  port: process.env.MYSQL_PORT || 3306, 
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    process.exit(1); // Stop the app if DB fails
  }
  console.log('✅ MySQL connected');
});

module.exports = db;
