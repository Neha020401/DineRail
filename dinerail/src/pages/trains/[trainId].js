'use client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '../../utils/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TrainDetails } from '@/components/TrainDetails';
import styles from '../../../public/StyleSheet/trainid.module.css';

export default function TrainDetailsPage() {
  const router = useRouter();
  const { trainId } = router.query;
  const [train, setTrain] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (trainId) {
      api.get(`/trains/${trainId}`)
        .then((response) => {
          setTrain(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching train details:', error);
          setLoading(false);
        });
    }
  }, [trainId]);

  if (loading) return <p className={styles.container}>Loading...</p>;

  if (!train) return <p className={styles.container}>Train not found.</p>;

  return (
    <div >
      <Navbar />
      <div className={styles.container}>
      <h2 className={styles.heading}>Train Details</h2>
      <TrainDetails train={train} />
      <button 
        onClick={() => router.push(`/trains/${train.train_number}/booking`)}
        className={styles.bookButton}
      >
        Book Ticket
      </button>
      </div>
      <Footer />
    </div>
  );
}
