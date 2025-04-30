const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Booking = sequelize.define('Booking', {
  trainNo: DataTypes.STRING,
  from: DataTypes.STRING,
  to: DataTypes.STRING,
  date: DataTypes.STRING,
  seatType: DataTypes.STRING,
});

Booking.belongsTo(User, { foreignKey: 'userId' });

module.exports = Booking;
