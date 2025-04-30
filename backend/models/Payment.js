const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Booking = require('./Booking');

const Payment = sequelize.define('Payment', {
  paymentId: DataTypes.STRING,
  status: DataTypes.STRING,
});

Payment.belongsTo(Booking, { foreignKey: 'bookingId' });

module.exports = Payment;
