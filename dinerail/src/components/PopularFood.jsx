
import React from 'react';
import { Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';


// Sample food data - in a real app, this would come from an API
const popularFoods = [
  {
    id: 1,
    name: "Veg Thali",
    provider: "Namaste Foods",
    image: "https://media.istockphoto.com/id/1158623408/photo/indian-hindu-veg-thali-food-platter-selective-focus.jpg?s=1024x1024&w=is&k=20&c=X8Fq8SVoZRTEs-Rwt5iAaX3dbZehWmFssd857ez66D8=",
    rating: 4.8,
    price: 180,
    prepTime: "15 min",
    isVeg: true
  },
  {
    id: 2,
    name: "Chicken Biryani",
    provider: "Spice Junction",
    image: "https://media.istockphoto.com/id/1345624336/photo/chicken-biriyani.jpg?s=1024x1024&w=is&k=20&c=bvTAMlq5A8Z5EhVjBn6D8eYOQS-rsuKmT9ToLkCc2Y4=",
    rating: 4.5,
    price: 220,
    prepTime: "20 min",
    isVeg: false
  },
  {
    id: 3,
    name: "Masala Dosa",
    provider: "South Express",
    image: "https://images.pexels.com/photos/20422138/pexels-photo-20422138.jpeg",
    rating: 4.7,
    price: 120,
    prepTime: "10 min",
    isVeg: true
  },
  {
    id: 4,
    name: "Paneer Butter Masala",
    provider: "Punjabi Delight",
    image: "https://media.istockphoto.com/id/1305516669/photo/shahi-paneer-or-paneer-kadai.jpg?s=1024x1024&w=is&k=20&c=rfrrL7D6jmoZgxo3znCqWWEf_y9JR0AH-K55adqyff0=",
    rating: 4.6,
    price: 240,
    prepTime: "15 min",
    isVeg: true
  }
];

const PopularFood = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Popular Food Items</h2>
          <Link href="/services/food">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularFoods.map((food) => (
            <div key={food.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src={food.image} alt={food.name} className="w-full h-48 object-cover" />
                <div className="absolute top-2 right-2">
                  <Badge variant={food.isVeg ? "outline" : "default"} className={food.isVeg ? "bg-green-500 text-white" : "bg-red-500 text-white"}>
                    {food.isVeg ? "Veg" : "Non-veg"}
                  </Badge>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{food.name}</h3>
                  <div className="flex items-center bg-yellow-100 px-2 py-0.5 rounded">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm ml-1">{food.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">{food.provider}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold">₹{food.price}</span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {food.prepTime}
                  </div>
                </div>
                
                <Link href={`/services/food`}>
                  <Button className="w-full">View Details</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularFood;
