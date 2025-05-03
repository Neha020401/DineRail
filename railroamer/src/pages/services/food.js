// pages/services/food.js
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function FoodPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/food-items`)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error('Error fetching food items:', err));
  }, []); 

  return (
   <>
   <Navbar/>
   <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map(item => (
        <Link href={`/services/food/${item.id}`} key={item.id}> 
          <div className="border p-3 rounded shadow hover:shadow-lg cursor-pointer">
            <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL + item.image_url}`} className="w-full h-40 object-cover rounded" alt={item.name} />
            <h2 className="text-xl font-bold mt-2">{item.name}</h2>
            <p className="text-sm text-gray-500">₹{item.price}</p>
            <p className="text-sm text-blue-600">
              {item.provider_type === 'TRAIN_SERVICE'
                ? `Train: ${item.train_name} (${item.train_number})`
                : `Station: ${item.station_name}`}
            </p>
          </div>
        </Link>
      ))}
    </div>
   <Footer/>
   </>
  );
}
