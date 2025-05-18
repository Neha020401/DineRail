import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('/bookings')
      .then((res) => setBookings(res.data))
      .catch((err) => console.error('Error fetching bookings:', err));
  }, []);

  return (
    <div className="p-4">
      <Navbar />
      <h2>My Bookings</h2>
      {bookings.map((booking) => (
        <div key={booking.id} className="p-2 border mb-2">
          <p>Booking ID: {booking.id}</p>
          <p>Train: {booking.train_id}</p>
          <p>Date: {booking.date}</p>
          <p>From: {booking.train_from}</p>
          <p>To: {booking.train_to}</p>
          <p>Status: {booking.booking_status}</p>
        </div>
      ))}
      <Footer />
    </div>
  );
}
