//backend/routes/bookingRoutes

const express = require('express');
const router = express.Router();
const bookingController = require('../controller/bookingController');

router.post('/create', bookingController.createBooking);
router.get('/:bookingId', bookingController.getBooking);

module.exports = router;
