import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [type, setType] = useState(''); // 'user' or 'provider'
  const [form, setForm] = useState({ name: '', phone: '', dob: '', aadhar: '', email: '' });
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return router.push('/login');

    const fetchProfile = async () => {
      try {
        const resUser = await axios.get('http://localhost:5000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setType('user');
        setProfile(resUser.data);
        setForm({
          name: resUser.data.name || '',
          phone: resUser.data.phone || '',
          dob: resUser.data.dob || '',
          aadhar: resUser.data.aadhar || '',
          email: resUser.data.email || '',
        });
      } catch (userErr) {
        try {
          const resProvider = await axios.get('http://localhost:5000/api/provider/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setType('provider');
          setProfile(resProvider.data);
        } catch (providerErr) {
          console.error('No valid profile found');
          router.push('/login');
        }
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogout = async () => {
    localStorage.removeItem('token');
    try {
      await axios.post('http://localhost:5000/api/auth/logout');
    } catch {}
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
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-6 text-center">Profile</h1>

          {type === 'user' ? (
            editing ? (
              <div className="space-y-4">
                <input name="name" value={form.name} onChange={handleChange} className="w-full border px-3 py-2" placeholder="Name" />
                <input name="phone" value={form.phone} onChange={handleChange} className="w-full border px-3 py-2" placeholder="Phone" />
                <input name="dob" type="date" value={form.dob} onChange={handleChange} className="w-full border px-3 py-2" />
                <input name="aadhar" value={form.aadhar} onChange={handleChange} className="w-full border px-3 py-2" placeholder="Aadhar" />
                <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded w-full">Save</button>
              </div>
            ) : (
              <div className="space-y-2 text-lg">
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Phone:</strong> {profile.phone}</p>
                <p><strong>DOB:</strong> {profile.dob}</p>
                <p><strong>Aadhar:</strong> {profile.aadhar}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <button onClick={() => setEditing(true)} className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded w-full">Edit Profile</button>
              </div>
            )
          ) : (
            <div className="space-y-2 text-lg">
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Type:</strong> {profile.provider_type}</p>
              {profile.provider_type === 'TRAIN_SERVICE' ? (
                <>
                  <p><strong>Train Name:</strong> {profile.train_name}</p>
                  <p><strong>Train Number:</strong> {profile.train_number}</p>
                </>
              ) : (
                <p><strong>Station Name:</strong> {profile.station_name}</p>
              )}
              <div className="pt-2"><Link className="text-blue-600 underline" href="/upload">Upload Food</Link></div>
            </div>
          )}

          <button onClick={handleLogout} className="mt-6 bg-red-600 text-white px-4 py-2 rounded w-full">
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
