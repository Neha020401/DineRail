import { useState } from 'react';
import api from '../utils/api';

export function BookingForm({ train }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [seatType, setSeatType] = useState('');

  const handleBooking = async () => {
    try {
      const response = await api.post('/bookings', {
        train_id: train.train_number,
        passengers: [{ name, age, gender }],
        seat_type: seatType,
        fare: 500
      });
      alert(`Booking Confirmed! ID: ${response.data.booking_id}`);
    } catch (error) {
      console.error('Error booking ticket:', error);
    }
  };

  return (
    <div className="p-4">
      <h2>Book a Ticket</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" />
      <input value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Gender" />
      <input value={seatType} onChange={(e) => setSeatType(e.target.value)} placeholder="Seat Type" />
      <button onClick={handleBooking}>Book Now</button>
    </div>
  );
}
