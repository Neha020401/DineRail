import { useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function OrderPage() {
  const [form, setForm] = useState({
    food_name: '',
    quantity: '',
    delivery_location: '',
  });
  const [ordered, setOrdered] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const placeOrder = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/order-food`, form, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setOrdered(true);
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Order Food</h1>
        {!ordered ? (
          <div className="space-y-3">
            <input name="food_name" onChange={handleChange} placeholder="Food Item" className="w-full border p-2" />
            <input name="quantity" onChange={handleChange} placeholder="Quantity" className="w-full border p-2" />
            <input name="delivery_location" onChange={handleChange} placeholder="Delivery Location" className="w-full border p-2" />
            <button onClick={placeOrder} className="w-full bg-blue-600 text-white p-2 rounded">Order</button>
          </div>
        ) : (
          <p className="text-green-600 text-center mt-4 font-semibold">Order Placed Successfully!</p>
        )}
      </div>
      <Footer />
    </>
  );
}
