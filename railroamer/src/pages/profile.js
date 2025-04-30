import { useEffect, useState } from 'react';
import api from '../utils/api';
import Navbar from '../components/Navbar';

export default function Profile() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get('/bookings').then((res) => setBookings(res.data)).catch(() => alert('Error fetching bookings'));
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
        {bookings.map((b, i) => (
          <div key={i} className="bg-white p-4 mb-2 shadow rounded">
            <p><strong>Train:</strong> {b.trainNo}</p>
            <p><strong>From:</strong> {b.from} ➡ <strong>To:</strong> {b.to}</p>
            <p><strong>Date:</strong> {b.date}</p>
            <p><strong>Seat:</strong> {b.seatType}</p>
          </div>
        ))}
      </div>
    </>
  );
}
