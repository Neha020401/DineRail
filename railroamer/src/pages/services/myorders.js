import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/orders`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>
        <div className="grid gap-4">
          {orders.map((o) => (
            <div
              key={o.id}
              className="border p-4 rounded shadow cursor-pointer hover:bg-gray-100"
              onClick={() => setSelected(o)}
            >
              <p><strong>Item:</strong> {o.food_name}</p>
              <p><strong>Amount:</strong> ₹{o.amount}</p>
            </div>
          ))}
        </div>
        {selected && (
          <div className="mt-6 p-4 border-t">
            <h2 className="text-xl font-semibold">Order Details</h2>
            <p><strong>Food:</strong> {selected.food_name}</p>
            <p><strong>Quantity:</strong> {selected.quantity}</p>
            <p><strong>Delivery:</strong> {selected.delivery_location}</p>
            <p><strong>Payment:</strong> {selected.payment_status}</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
