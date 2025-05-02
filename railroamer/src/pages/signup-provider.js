// pages/signup-provider.js
import { useState } from 'react';
import axios from 'axios';

export default function ProviderSignup() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', service_type: '', contact_number: '', gst_number: '',
    train_name: '', train_number: '', station_name: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = { ...form };
      if (form.service_type !== 'Train_Service') {
        delete data.train_name;
        delete data.train_number;
      }
      if (form.service_type !== 'Station_Vendor') {
        delete data.station_name;
      }

      const res = await axios.post('/api/auth/provider/signup', data);
      alert('Provider signed up!');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <select name="service_type" onChange={handleChange} required>
        <option value="">Select Service Type</option>
        <option value="Train_Service">Train Service</option>
        <option value="Station_Vendor">Station Vendor</option>
      </select>
      <input name="contact_number" placeholder="Contact Number" onChange={handleChange} required />
      <input name="gst_number" placeholder="GST Number" onChange={handleChange} required />

      {form.service_type === 'Train_Service' && (
        <>
          <input name="train_name" placeholder="Train Name" onChange={handleChange} required />
          <input name="train_number" placeholder="Train Number" onChange={handleChange} required />
        </>
      )}

      {form.service_type === 'Station_Vendor' && (
        <input name="station_name" placeholder="Station Name" onChange={handleChange} required />
      )}

      <button type="submit">Sign Up</button>
    </form>
  );
}
