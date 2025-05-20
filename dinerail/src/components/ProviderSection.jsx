
import React from 'react';
import { ChefHat, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ProviderSection = () => {
  const benefits = [
    "Expand your customer base to train travelers",
    "Zero setup cost to join our platform",
    "Simple order management system",
    "Timely payments and transparent fee structure",
    "Analytics to improve your business"
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-food/10 to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block p-2 bg-food/20 rounded-lg mb-4">
              <ChefHat className="h-6 w-6 text-food" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Become a Food Provider Partner</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join our network of food providers and expand your business to serve passengers on trains. Reach new customers and increase your revenue with minimal effort.
            </p>
            
            <ul className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-food mr-2 mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            
<Link href="/provider/signup" >
  <Button asChild className="bg-food hover:bg-food-dark text-white">
    <span>
      Register as Provider
      <ArrowRight className="ml-2 h-4 w-4 inline" />
    </span>
  </Button>
</Link>

          </div>
          
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04" 
                alt="Food provider preparing meals" 
                className="w-full h-auto"
              />
            </div>
            
            <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg max-w-xs">
              <div className="text-sm text-gray-500 mb-1">Average Monthly Earnings</div>
              <div className="text-2xl font-bold text-food">₹45,000+</div>
              <div className="text-xs text-gray-400">for active providers</div>
            </div>
            
            <div className="absolute -top-6 -left-6 bg-white p-4 rounded-lg shadow-lg transform -rotate-3">
              <div className="font-bold text-lg text-train">200+</div>
              <div className="text-sm text-gray-500">Active Providers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProviderSection;
