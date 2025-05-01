const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const db = require('./models/db'); // MySQL pool or connection

// Load environment variables
dotenv.config();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const authRoutes = require('./routes/authRoutes'); 
const userRoutes = require('./routes/userRoutes');
const providerRoutes = require('./routes/providerRoutes');  
const bookingRoutes = require('./routes/bookingRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Mount Routes
app.use('/api/auth', authRoutes);           // Auth (user + provider)
app.use('/api/user', userRoutes);           // User profile, bookings, orders
app.use('/api/provider', providerRoutes);   // Provider profile, food management
app.use('/api/bookings', bookingRoutes);    // Ticket bookings
app.use('/api/orders', orderRoutes);        // Food ordering
app.use('/api/payments', paymentRoutes);    // Payment routes

// Home route
app.get('/', (req, res) => {
  res.send('Train Reservation + Food Service Backend is Running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
