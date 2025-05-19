//frontend/pages/trains/[trainId]/booking.js 
'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BookingPage() {
  const router = useRouter();
  const { trainId } = router.query;
  const [userId, setUserId] = useState('');
  const [coachId, setCoachId] = useState('');
  const [date, setDate] = useState('');
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [seatType, setSeatType] = useState('');
  const [fare, setFare] = useState('');
  const [passengers, setPassengers] = useState([{ name: '', age: '', gender: '', berth_preference: '', seat_number: '' }]);

  const handleBooking = async () => {
    try {
      const response = await axios.post('/bookings/create', {
        user_id: userId,
        train_id: trainId,
        coach_id: coachId,
        date,
        train_from: fromStation,
        train_to: toStation,
        seat_type: seatType,
        fare,
        passengers
      });

      alert(`Booking successful! Booking ID: ${response.data.booking_id}`);
      router.push('/mybookings');
    } catch (error) {
      alert('Booking failed: ' + error.response.data.error);
    }
  };

  return (
    <div className="p-4">
      <Navbar />
      <h2>Book Ticket for Train {trainId}</h2>
      <input placeholder="User ID" onChange={(e) => setUserId(e.target.value)} />
      <input placeholder="Coach ID" onChange={(e) => setCoachId(e.target.value)} />
      <input placeholder="Date" type="date" onChange={(e) => setDate(e.target.value)} />
      <input placeholder="From" onChange={(e) => setFromStation(e.target.value)} />
      <input placeholder="To" onChange={(e) => setToStation(e.target.value)} />
      <input placeholder="Seat Type" onChange={(e) => setSeatType(e.target.value)} />
      <input placeholder="Fare" onChange={(e) => setFare(e.target.value)} />
      <button onClick={handleBooking}>Book Now</button>
      <Footer />
    </div>
  );
}
