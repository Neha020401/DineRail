// user profile 
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '../../../public/StyleSheet/user.module.css'; 

export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', dob: '', aadhar: '', email: '' });
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
          phone: res.data.phone_no || '',
          dob: res.data.dob || '',
          aadhar: res.data.aadhar_card || '',
          email: res.data.email || '',
        });
      } catch (err) {
        router.push('/login');
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      await axios.put(`/api/user/profile`, form, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEditing(false);
    } catch (err) {
      alert('Failed to update profile');
    }
  };

  if (!profile) return <p className={styles.loading}>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>User Profile</h1>
          {editing ? (
            <div className={styles.form}>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className={styles.input}
              />
              <input
                name="phone"
                type="text"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className={styles.input}
              />
              <input
                name="dob"
                type="date"
                value={form.dob}
                onChange={handleChange}
                className={styles.input}
              />
              <input
                name="aadhar"
                type="text"
                value={form.aadhar}
                onChange={handleChange}
                placeholder="Aadhar Card"
                className={styles.input}
              />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className={styles.input}
              />
              <button onClick={handleSave} className={styles.saveBtn}>Save</button>
            </div>
          ) : (
            <div className={styles.profileData}>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Phone:</strong> {profile.phone_no}</p>
              <p><strong>DOB:</strong> {profile.dob}</p>
              <p><strong>Aadhar:</strong> {profile.aadhar_card}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <button onClick={() => setEditing(true)} className={styles.editBtn}>Edit Profile</button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
