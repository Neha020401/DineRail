
import React from 'react';
import { Star, User } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Frequent Traveler",
    comment: "TrainTable has completely transformed my train journeys. Now I don't have to worry about station food or packing meals. The delivery was right on time and the food was delicious!",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=33"
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Business Traveler",
    comment: "As someone who travels weekly for work, having quality food delivered to my seat has been a game-changer. The variety of options and timely delivery make TrainTable my go-to service.",
    rating: 4,
    avatar: "https://i.pravatar.cc/100?img=26"
  },
  {
    id: 3,
    name: "Amit Singh",
    role: "Family Vacation",
    comment: "Traveled with my family and ordered food for all of us. The kids loved their meals and it saved us from the hassle of carrying food or dealing with crowded station vendors.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=59"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Thousands of train passengers enjoy our food delivery service every day. Here's what some of them have to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              
              <p className="text-gray-600 italic mb-6">"{testimonial.comment}"</p>
              
              <div className="flex items-center">
                {testimonial.avatar ? (
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="h-12 w-12 rounded-full object-cover mr-4" 
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                    <User className="h-6 w-6 text-gray-500" />
                  </div>
                )}
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
