import React from 'react';
import { Train, Coffee, Clock, MapPin, ShoppingCart, User } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Train className="h-8 w-8 text-train" />,
      title: "Train Search",
      description: "Find food options available for your specific train and journey."
    },
    {
      icon: <Coffee className="h-8 w-8 text-food" />,
      title: "Diverse Menu",
      description: "Choose from a wide variety of local and restaurant foods."
    },
    {
      icon: <Clock className="h-8 w-8 text-train" />,
      title: "Timely Delivery",
      description: "Food delivered to your seat at your preferred station or time."
    },
    {
      icon: <MapPin className="h-8 w-8 text-food" />,
      title: "Live Tracking",
      description: "Track your food order in real-time until it reaches you."
    },
    {
      icon: <ShoppingCart className="h-8 w-8 text-train" />,
      title: "Easy Ordering",
      description: "Simple and hassle-free food ordering process."
    },
    {
      icon: <User className="h-8 w-8 text-food" />,
      title: "Provider Portal",
      description: "Simplified platform for food vendors to manage orders."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How TrainTable Works</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We connect hungry train passengers with quality food providers for a seamless dining experience during your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4 inline-block p-3 bg-gray-100 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
