// pages/trains/[trainId].js
'use client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '../../utils/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TrainDetails } from '@/components/TrainDetails';

export default function TrainDetailsPage() {
  const router = useRouter();
  const { trainId } = router.query;
  const [train, setTrain] = useState(null);
  const [loading, setLoading] = useState(true);  // Track loading state

  useEffect(() => {
    if (trainId) {
      api.get(`/trains/${trainId}`)
        .then((response) => {
          setTrain(response.data);
          setLoading(false);  // Set loading to false after fetching data
        })
        .catch((error) => {
          console.error('Error fetching train details:', error);
          setLoading(false);  // Set loading to false on error
        });
    }
  }, [trainId]);

  if (loading) return <p className="p-4">Loading...</p>;

  if (!train) return <p className="p-4">Train not found.</p>;

  return (
    <div className="p-4">
      <Navbar />
      <h2 className="text-2xl mb-4">Train Details</h2>
      <TrainDetails train={train} />
       <button 
      onClick={() => router.push(`/trains/${train.train_number}/booking`)}
      className="mt-4 p-2 bg-green-500 text-white"
    >
      Book Ticket
    </button>
      <Footer />
    </div>
  );
}
