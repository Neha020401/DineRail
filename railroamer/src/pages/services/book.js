import { useState } from 'react';
import api from '../../utils/api';
import Navbar from '../../components/Navbar';
import styles from '../../../public/StyleSheet/Book.module.css';

export default function Book() {
  const [form, setForm] = useState({ trainNo: '', from: '', to: '', date: '', seatType: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/bookings', form);
      alert('Booking created!');
      setForm({ trainNo: '', from: '', to: '', date: '', seatType: '' });
    } catch (err) {
      alert('Error creating booking');
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.title}>Book a Train</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input 
            type="text" 
            placeholder="Train No" 
            value={form.trainNo} 
            onChange={(e) => setForm({ ...form, trainNo: e.target.value })} 
            className={styles.input} 
          />
          <input 
            type="text" 
            placeholder="From" 
            value={form.from} 
            onChange={(e) => setForm({ ...form, from: e.target.value })} 
            className={styles.input} 
          />
          <input 
            type="text" 
            placeholder="To" 
            value={form.to} 
            onChange={(e) => setForm({ ...form, to: e.target.value })} 
            className={styles.input} 
          />
          <input 
            type="date" 
            value={form.date} 
            onChange={(e) => setForm({ ...form, date: e.target.value })} 
            className={styles.input} 
          />
          <input 
            type="text" 
            placeholder="Seat Type" 
            value={form.seatType} 
            onChange={(e) => setForm({ ...form, seatType: e.target.value })} 
            className={styles.input} 
          />
          <button type="submit" className={styles.button}>Book Now</button>
        </form>
      </div>
    </>
  );
}