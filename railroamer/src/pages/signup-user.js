// pages/signup-user.js
import { useState } from 'react';
import axios from 'axios';

export default function UserSignup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phoneno: '', dob: '', aadhar_card: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/user/signup', form);
      alert('User signed up!');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      {['name', 'email', 'password', 'phoneno', 'dob', 'aadhar_card'].map(field => (
        <input key={field} name={field} type={field === 'password' ? 'password' : 'text'} placeholder={field} onChange={handleChange} required />
      ))}
      <button type="submit">Sign Up</button>
    </form>
  );
}
