import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MyBooking() {
  const [bookings, setBookings] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/bookings`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setBookings(res.data);
    };
    fetchBookings();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
        <div className="grid gap-4">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="border p-4 rounded shadow cursor-pointer hover:bg-gray-100"
              onClick={() => setSelected(b)}
            >
              <p><strong>Train:</strong> {b.train_name}</p>
              <p><strong>Date:</strong> {b.date}</p>
            </div>
          ))}
        </div>
        {selected && (
          <div className="mt-6 p-4 border-t">
            <h2 className="text-xl font-semibold">Booking Details</h2>
            <p><strong>Train:</strong> {selected.train_name}</p>
            <p><strong>From:</strong> {selected.source}</p>
            <p><strong>To:</strong> {selected.destination}</p>
            <p><strong>Seat:</strong> {selected.seat_number}</p>
            <p><strong>Payment:</strong> {selected.payment_status}</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
