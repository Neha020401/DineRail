// pages/services/food/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function FoodDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [food, setFood] = useState(null);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  const [order, setOrder] = useState({ quantity: 1, train_name: '', train_no: '', seat_number: '' });

  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/food-items/${id}`)
        .then(res => res.json())
        .then(data => setFood(data));
    }
  }, [id]);

  const handleReview = async () => {
    const res = await fetch(`/api/orders/${food.order_id}/review`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({ review: rating, comment: review }),
    });
    const data = await res.json();
    alert(data.message);
  };

  const handleOrder = async () => {
    const res = await fetch('/api/orders/place', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({
        food_item_id: food.id,
        provider_id: food.provider_id,
        quantity: order.quantity,
        train_name: order.train_name,
        train_no: order.train_no,
        seat_number: order.seat_number
      }),
    });

    const data = await res.json();
    if (data.order_id) {
      // simulate payment call
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/payments/pay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ booking_id: data.order_id, amount: data.total_price }),
      });
      alert('Order placed and paid successfully!');
    } else {
      alert(data.message);
    }
  };

  if (!food) return <p>Loading...</p>;

  return (
   <>
   <Navbar/>
   <div className="p-6">
      <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL + food.image_url}`} alt={food.name} className="w-full h-60 object-cover rounded" />
      <h1 className="text-3xl font-bold mt-4">{food.name}</h1>
      <p className="text-gray-600 mt-2">{food.description}</p>
      <p className="text-xl font-semibold mt-2">₹{food.price}</p>

      {/* <div className="mt-6">
        <h2 className="text-lg font-semibold">Leave a Review</h2>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border p-2 w-20"
        />
        <textarea
          className="border w-full p-2 mt-2"
          placeholder="Write your comment"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <button onClick={handleReview} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
          Submit Review
        </button>
      </div> */}

      {/* <div className="mt-8">
        <h2 className="text-lg font-semibold">Order Now</h2>
        <input
          type="number"
          placeholder="Quantity"
          value={order.quantity}
          onChange={(e) => setOrder({ ...order, quantity: e.target.value })}
          className="border p-2 block mt-2"
        />
        <input
          type="text"
          placeholder="Train Name"
          value={order.train_name}
          onChange={(e) => setOrder({ ...order, train_name: e.target.value })}
          className="border p-2 block mt-2"
        />
        <input
          type="text"
          placeholder="Train Number"
          value={order.train_no}
          onChange={(e) => setOrder({ ...order, train_no: e.target.value })}
          className="border p-2 block mt-2"
        />
        <input
          type="text"
          placeholder="Seat Number"
          value={order.seat_number}
          onChange={(e) => setOrder({ ...order, seat_number: e.target.value })}
          className="border p-2 block mt-2"
        />
        <button onClick={handleOrder} className="mt-3 px-6 py-2 bg-green-600 text-white rounded">
          Place & Pay
        </button>
      </div> */}
    </div>
    <Footer/>
   </>
  );
}
