import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '../../public/StyleSheet/uplod.module.css'; // import CSS

export default function UploadFood() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', description: '', price: '' });
  const [image, setImage] = useState(null);
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/provider/profile`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setRole(res.data.role || 'PROVIDER');
      } catch (err) {
        router.push('/login');
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !image) {
      setMessage('Please fill all required fields');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const providerId = user?.provider?.id;
    const providerName = user?.provider?.name || 'Provider';

    if (!providerId) {
      setMessage('Invalid provider session. Please log in again.');
      router.push('/login');
      return;
    }

    const formData = new FormData();
    formData.append('providerId', providerId);
    formData.append('providerName', providerName);
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('image', image);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/provider/food`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setMessage('Food item uploaded successfully');
      setForm({ name: '', description: '', price: '' });
      setImage(null);
    } catch (err) {
      setMessage('Upload failed');
    }
  };

  if (role !== 'PROVIDER') {
    return <p className={styles.unauthorized}>Unauthorized. Only providers can upload items.</p>;
  }

  return (
    <>
      <Navbar />
      <div className={styles.page}>
        <div className={styles.formCard}>
          <h2 className={styles.heading}>Upload Food Item</h2>
          {message && <p className={styles.message}>{message}</p>}
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Food Name"
              required
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              rows="3"
            ></textarea>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            <button type="submit">Upload</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
