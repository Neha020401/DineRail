import { useState } from 'react';
import api from '../../utils/api';
import Navbar from '../../components/Navbar';
import styles from '../../../public/StyleSheet/Book.module.css';

// Hardcoded Indian station list
const stations = [
  'New Delhi', 'Mumbai Central', 'Chennai Central', 'Howrah Junction',
  'Bangalore City', 'Secunderabad', 'Ahmedabad Junction', 'Pune Junction',
  'Patna Junction', 'Lucknow NR', 'Kanpur Central', 'Varanasi Junction',
  'Ernakulam Junction', 'Nagpur Junction', 'Bhopal Junction'
];

export default function Booking() {
  const [form, setForm] = useState({
    train_from: '',
    train_to: '',
    date: '',
    seat_type: '',
    fare: '',
    train_id: ''
  });

  const [passengers, setPassengers] = useState([
    { name: '', age: '', gender: '', address: '' }
  ]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handlePassengerChange = (index, e) => {
    const updated = [...passengers];
    updated[index][e.target.name] = e.target.value;
    setPassengers(updated);
  };

  const addPassenger = () => {
    setPassengers([...passengers, { name: '', age: '', gender: '', address: '' }]);
  };

  const removePassenger = (index) => {
    const updated = passengers.filter((_, i) => i !== index);
    setPassengers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (form.train_from === form.train_to) {
      setMessage("❌ 'From' and 'To' stations cannot be the same.");
      return;
    }

    const hasInvalidAge = passengers.some(p => parseInt(p.age) <= 5);
    if (hasInvalidAge) {
      setMessage("❌ Passenger age must be above 5.");
      return;
    }

    setLoading(true);
    try {
      await api.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/bookings/book`, { ...form, passengers });
      setMessage('✅ Booking successful!');
      setForm({
        train_from: '',
        train_to: '',
        date: '',
        seat_type: '',
        fare: '',
        train_id: ''
      });
      setPassengers([{ name: '', age: '', gender: '', address: '' }]);
    } catch (err) {
      setMessage('❌ Failed to book. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.title}>Book a Train</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* From Station */}
          <select value={form.train_from}
            onChange={(e) => setForm({ ...form, train_from: e.target.value })}
            className={styles.input} required>
            <option value="">Select From Station</option>
            {stations.map((station) => (
              <option key={station} value={station} disabled={station === form.train_to}>
                {station}
              </option>
            ))}
          </select>

          {/* To Station */}
          <select value={form.train_to}
            onChange={(e) => setForm({ ...form, train_to: e.target.value })}
            className={styles.input} required>
            <option value="">Select To Station</option>
            {stations.map((station) => (
              <option key={station} value={station} disabled={station === form.train_from}>
                {station}
              </option>
            ))}
          </select>

          <input type="date" value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })} className={styles.input} required />
          <input type="text" placeholder="Seat Type (e.g., Sleeper)" value={form.seat_type}
            onChange={(e) => setForm({ ...form, seat_type: e.target.value })} className={styles.input} required />
          <input type="number" placeholder="Fare" value={form.fare}
            onChange={(e) => setForm({ ...form, fare: e.target.value })} className={styles.input} required />
          <input type="text" placeholder="Train ID / Number" value={form.train_id}
            onChange={(e) => setForm({ ...form, train_id: e.target.value })} className={styles.input} required />

          <h3>Passenger Details</h3>
          {passengers.map((p, idx) => (
            <div key={idx} className={styles.passengerBlock}>
              <input type="text" name="name" placeholder="Name" value={p.name}
                onChange={(e) => handlePassengerChange(idx, e)} className={styles.input} required />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={p.age}
                onChange={(e) => handlePassengerChange(idx, e)}
                className={styles.input}
                required
                min="6"
              />
              <select name="gender" value={p.gender} onChange={(e) => handlePassengerChange(idx, e)} className={styles.input} required>
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <input type="text" name="address" placeholder="Address" value={p.address}
                onChange={(e) => handlePassengerChange(idx, e)} className={styles.input} required />
              {passengers.length > 1 && (
                <button type="button" onClick={() => removePassenger(idx)} className={styles.removeBtn}>Remove</button>
              )}
            </div>
          ))}

          <button type="button" onClick={addPassenger} className={styles.addBtn}>Add Passenger</button>

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Booking...' : 'Book Now'}
          </button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </>
  );
}
