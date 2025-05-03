import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !image) {
      setMessage('Please fill all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('image', image);

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/provider/food`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMessage('Food item uploaded successfully');
      setForm({ name: '', description: '', price: '' });
      setImage(null);
    } catch (err) {
      setMessage('Upload failed');
    }
  };

  if (role !== 'PROVIDER') {
    return <p className="text-center mt-10">Unauthorized. Only providers can upload items.</p>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
        <div className="bg-white rounded-2xl shadow-md p-6 max-w-lg w-full">
          <h2 className="text-2xl font-semibold text-center mb-6">Upload Food Item</h2>
          {message && <p className="text-center mb-4 text-red-500">{message}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Food Name"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              rows="3"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
              required
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded font-semibold transition duration-200"
            >
              Upload
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
