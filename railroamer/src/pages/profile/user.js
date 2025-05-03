//pages/profile/user.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', dob: '', aadhar: '',email:'' });
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/profile`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setProfile(res.data);
        setForm({
          name: res.data.name || '',
          phone: res.data.phone || '',
          dob: res.data.dob || '',
          aadhar: res.data.aadhar || '',
          email:res.data.email || ''
        });
      } catch (err) {
        router.push('/login');
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  
  const handleSave = async () => {
    try {
      await axios.put('/api/user/profile', form, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEditing(false);
    } catch (err) {
      alert('Failed to update profile');
    }
  };

  if (!profile) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">User Profile</h1>
        {editing ? (
          <div className="space-y-4">
            <input name="name" type="text" value={form.name} onChange={handleChange} placeholder="Name" className="w-full border px-3 py-2" />
            <input name="phone" type="text" value={form.phone} onChange={handleChange} placeholder="Phone" className="w-full border px-3 py-2" />
            <input name="dob" type="date" value={form.dob} onChange={handleChange} className="w-full border px-3 py-2" />
            <input name="aadhar" type="text" value={form.aadhar} onChange={handleChange} placeholder="Aadhar Card" className="w-full border px-3 py-2" />
            <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded w-full">Save</button>
          </div>
        ) : (
          <div className="space-y-2 text-lg">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>
            <p><strong>DOB:</strong> {profile.dob}</p>
            <p><strong>Aadhar:</strong> {profile.aadhar}</p>
            <button onClick={() => setEditing(true)} className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded w-full">Edit Profile</button>
          </div>
        )}
      </div>
      {!editing && (
  <button
    onClick={handleLogout}
    className="mt-2 bg-red-600 text-white px-4 py-2 rounded w-full"
  >
    Logout
  </button>
)}

    </div>
    <Footer/>
    </>
    
  );
}