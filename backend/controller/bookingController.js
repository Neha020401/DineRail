const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

exports.createBooking = async (req, res) => {
  const {
    user_id, train_id, coach_id, date, train_from,
    train_to, seat_type, passengers, fare
  } = req.body;

  const bookingId = uuidv4();
  const createdAt = new Date();
  const seatNumbers = passengers.map(p => p.seat_number).join(',');

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    await connection.query(`
      INSERT INTO bookings (
        id, user_id, train_from, train_to, fare, date,
        seat_type, train_id, created_at, coach_id, seat_numbers,
        booking_status, payment_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'CONFIRMED', 'PAID')
    `, [
      bookingId, user_id, train_from, train_to, fare, date,
      seat_type, train_id, createdAt, coach_id, seatNumbers
    ]);

    for (const p of passengers) {
      const { name, age, gender, berth_preference, seat_number } = p;

      const [seatRows] = await connection.query(`
        SELECT s.id FROM seats s
        JOIN coaches c ON s.coach_id = c.id
        WHERE c.coach_id = ? AND s.seat_number = ? AND c.train_id = ?
      `, [coach_id, seat_number, train_id]);

      const seatId = seatRows[0]?.id;
      if (!seatId) throw new Error(`Seat ${seat_number} not found`);

      await connection.query(`
        INSERT INTO passengers (
          booking_id, name, age, gender, berth_preference, seat_number
        ) VALUES (?, ?, ?, ?, ?, ?)
      `, [bookingId, name, age, gender, berth_preference, seat_number]);

      await connection.query(`
        INSERT INTO seat_availability (coach_id, seat_id, travel_date, is_booked)
        VALUES (?, ?, ?, 1)
        ON DUPLICATE KEY UPDATE is_booked = 1
      `, [coach_id, seatId, date]);
    }

    await connection.commit();
    res.json({ booking_id: bookingId, status: 'CONFIRMED' });

  } catch (err) {
    await connection.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    connection.release();
  }
};

exports.getBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const [bookingRows] = await db.query(
      `SELECT * FROM bookings WHERE id = ?`,
      [bookingId]
    );

    const [passengerRows] = await db.query(
      `SELECT * FROM passengers WHERE booking_id = ?`,
      [bookingId]
    );

    res.json({
      ...bookingRows[0],
      passengers: passengerRows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
