//backend/controller/trainController
const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

exports.searchTrains = async (req, res) => {
  const { from, to, date } = req.body;

  try {
    // 1. Fetch trains matching route and running day
    const [trains] = await db.query(`
      SELECT DISTINCT t.train_number, t.train_name, t.source_station, t.destination_station
      FROM trains t
      JOIN routes r1 ON t.train_number = r1.train_number
      JOIN routes r2 ON t.train_number = r2.train_number
      JOIN running_days rd ON t.train_number = rd.train_number
      WHERE r1.station_code = ? AND r2.station_code = ?
        AND r1.day <= r2.day
        AND rd.day_code = UPPER(DATE_FORMAT(?, '%a'))
    `, [from, to, date]);

    if (trains.length === 0) {
      return res.json([]);
    }

    const detailedTrains = [];

    for (const train of trains) {
      const trainNumber = train.train_number;

      // 2. Fetch route for this train
      const [route] = await db.query(`
        SELECT station_code, arrival, departure, day
        FROM routes
        WHERE train_number = ?
        ORDER BY day, arrival
      `, [trainNumber]);

      // 3. Fetch running days
      const [days] = await db.query(`
        SELECT day_code FROM running_days
        WHERE train_number = ?
      `, [trainNumber]);

      // 4. Fetch basic coach info with fare
      const [coaches] = await db.query(`
        SELECT coach_type, class, fare, total_seats
        FROM coaches
        WHERE train_number = ?
      `, [trainNumber]);

      detailedTrains.push({
        ...train,
        route,
        running_days: days.map(d => d.day_code),
        coaches
      });
    }

    res.json(detailedTrains);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAvailability = async (req, res) => {
  const { trainNumber } = req.params;
  const { date } = req.query;

  try {
    const [rows] = await db.query(`
      SELECT c.coach_id, s.seat_number, s.berth,
        CASE
          WHEN ? IN (SELECT travel_date FROM availability a
                     JOIN booked_seats bs ON a.id = bs.availability_id
                     WHERE a.train_number = ? AND a.coach_id = c.coach_id AND bs.seat_number = s.seat_number)
          THEN 1
          ELSE 0
        END AS is_booked
      FROM coaches c
      JOIN seats s ON c.train_number = s.train_number AND c.coach_id = s.coach_id
      WHERE c.train_number = ?
    `, [date, trainNumber, trainNumber]);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addMultipleTrains = async (req, res) => {
  const trains = req.body.trains;

  if (!Array.isArray(trains) || trains.length === 0) {
    return res.status(400).json({ error: 'Trains data is required as a non-empty array' });
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    for (const train of trains) {
      // Insert into trains table
      await conn.execute(
        'INSERT INTO trains (train_number, train_name, source_station, destination_station) VALUES (?, ?, ?, ?)',
        [train.train_number, train.train_name, train.source_station, train.destination_station]
      );

      // Insert into routes
      for (const route of train.route) {
        await conn.execute(
          'INSERT INTO routes (train_number, station_code, arrival, departure, day) VALUES (?, ?, ?, ?, ?)',
          [train.train_number, route.station_code, route.arrival, route.departure === 'END' ? null : route.departure, route.day]
        );
      }

      // Insert into running_days
      for (const day of train.running_days) {
        await conn.execute(
          'INSERT INTO running_days (train_number, day_code) VALUES (?, ?)',
          [train.train_number, day.toUpperCase()]
        );
      }

      // Insert into coaches and seats
      for (const coach of train.coaches) {
        await conn.execute(
          'INSERT INTO coaches (train_number, coach_id, coach_type, class, fare, total_seats) VALUES (?, ?, ?, ?, ?, ?)',
          [train.train_number, coach.coach_id, coach.coach_type, coach.class, coach.fare, coach.seat_layout.total_seats]
        );

        for (const seat of coach.seat_layout.seats) {
          await conn.execute(
            'INSERT INTO seats (train_number, coach_id, seat_number, berth, booked) VALUES (?, ?, ?, ?, ?)',
            [train.train_number, coach.coach_id, seat.seat_number, seat.berth, seat.booked]
          );
        }
      }
    }

    await conn.commit();
    res.status(201).json({ message: 'Trains inserted successfully' });
  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(500).json({ error: 'Failed to insert trains' });
  } finally {
    conn.release();
  }
};

exports.deleteTrainByNumber = async (req, res) => {
  const { number } = req.params;

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // Delete seats linked to coaches of this train_number
    await conn.execute(`
      DELETE FROM seats WHERE coach_id IN (
        SELECT coach_id FROM coaches WHERE train_number = ?
      )
    `, [number]);

    // Delete coaches
    await conn.execute(`DELETE FROM coaches WHERE train_number = ?`, [number]);

    // Delete running_days
    await conn.execute(`DELETE FROM running_days WHERE train_number = ?`, [number]);

    // Delete train_routes
    await conn.execute(`DELETE FROM routes WHERE train_number = ?`, [number]);

    // Delete train itself
    const [result] = await conn.execute(`DELETE FROM trains WHERE train_number = ?`, [number]);

    if (result.affectedRows === 0) {
      throw new Error(`No train found with train_number: ${number}`);
    }

    await conn.commit();
    res.json({ message: `Train with train_number ${number} deleted successfully` });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
};


// backend/controller/trainController.js
exports.getTrainById = async (req, res) => {
  const { trainId } = req.params;
  try {
    const [train] = await db.query(`
      SELECT * FROM trains
      WHERE train_number = ?
    `, [trainId]);

    if (train.length === 0) {
      return res.status(404).json({ error: 'Train not found' });
    }

    res.json(train[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

