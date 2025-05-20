//frontend/src/pages/bookings/

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '../../utils/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BookingPage() {
  const router = useRouter();
  const { bookingId } = router.query;
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (bookingId) {
      api.get(`/bookings/${bookingId}`)
        .then((response) => setBooking(response.data))
        .catch((error) => console.error('Error fetching booking details:', error));
    }
  }, [bookingId]);

  if (!booking) return <p>Loading...</p>;

  return (
    <div className="p-4">
        <Navbar/>
      <h2 className="text-2xl mb-4">Booking ID: {bookingId}</h2>
      <p>Train: {booking.train_name}</p>
      <p>Date: {booking.date}</p>
      <p>Status: {booking.booking_status}</p>
      <Footer/>
    </div>
  );
}
