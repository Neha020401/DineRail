'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // for client-side navigation in Next.js
import { Search, Train } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from './Navbar';

const TrainSearch = () => {
  const [trainNumber, setTrainNumber] = useState('');
  const [trainName, setTrainName] = useState('');
  const [date, setDate] = useState('');

  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (trainNumber || trainName) {
      const query = new URLSearchParams({
        ...(trainNumber && { number: trainNumber }),
        ...(trainName && { name: trainName }),
        ...(date && { date })
      }).toString();
      router.push(`/trains?${query}`);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 flex items-center">
        <Train className="mr-2 h-6 w-6 text-train" />
        Find Your Train
      </h2>

      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="train-number" className="block text-sm font-medium text-gray-700 mb-1">
              Train Number
            </label>
            <Input
              id="train-number"
              type="text"
              placeholder="e.g., 12301"
              value={trainNumber}
              onChange={(e) => setTrainNumber(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="train-name" className="block text-sm font-medium text-gray-700 mb-1">
              Train Name (Optional)
            </label>
            <Input
              id="train-name"
              type="text"
              placeholder="e.g., Rajdhani Express"
              value={trainName}
              onChange={(e) => setTrainName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="journey-date" className="block text-sm font-medium text-gray-700 mb-1">
              Journey Date
            </label>
            <Input
              id="journey-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6">
          <Button
            type="submit"
            className="w-full md:w-auto"
            disabled={!trainNumber && !trainName}
          >
            <Search className="mr-2 h-4 w-4" />
            Search Trains
          </Button>
        </div>
      </form>

      <div className="mt-4 text-sm text-gray-500">
        <p>Search by train number or name to find food options available for your journey.</p>
      </div>
    </div>  
  );
};

export default TrainSearch;
