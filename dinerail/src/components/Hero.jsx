'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const router = useRouter();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-train to-train-dark">
      <div className="absolute top-0 left-0 w-full h-64 bg-white/5 transform -skew-y-6 -translate-y-32"></div>
      <div className="absolute bottom-0 left-0 w-full h-64 bg-white/5 transform skew-y-6 translate-y-32"></div>

      <div className="container mx-auto px-4 py-24 sm:py-32 relative z-10 text-center">
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
          <span className="block">Travel and Dine</span>
          <span className="block">Travel and Dine</span>
          <span className="block text-yellow-300">Travel and Dine With DineRail 
             </span>
             
        </h1>
        <p className="mt-6 max-w-lg mx-auto text-xl text-white/80 sm:max-w-3xl">
          Book train tickets and order delicious food for your journey. Enjoy hassle-free travel with premium comfort and taste.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Button
            size="lg"
            className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
            onClick={() => router.push('/trains')}
          >
            Find Trains <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-3 border-white text-white border-2 hover:bg-white/10"
            onClick={() => router.push('/food')}
          >
            Order Food
          </Button>
        </div>
      </div>

      {/* Animated train */}
      <div className="absolute bottom-4 w-full overflow-hidden">
        <div className="animate-train-move">
          <div className="train-shape bg-white/10 h-6 w-32 rounded-t-lg ml-16 relative">
            <div className="absolute bottom-0 left-4 w-4 h-3 bg-yellow-400 rounded"></div>
            <div className="absolute bottom-0 right-4 w-4 h-3 bg-yellow-400 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
