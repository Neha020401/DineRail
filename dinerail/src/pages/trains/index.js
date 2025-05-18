import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../utils/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SearchTrain() {
  const router = useRouter();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [trains, setTrains] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await api.post('/api/trains/', { from, to, date });
      setTrains(response.data);
    } catch (error) {
      console.error('Error searching trains:', error);
      setTrains([]);
    }
  };

  const handleTrainClick = (trainNumber) => {
    router.push(`/trains/${trainNumber}`);
  };

  return (
    <div className="p-4">
      <Navbar />
      <h2 className="text-2xl mb-4">Search Trains</h2>

      <input
        type="text"
        placeholder="From"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="p-2 border w-full mb-2"
      />
      <input
        type="text"
        placeholder="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="p-2 border w-full mb-2"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="p-2 border w-full mb-2"
      />
      <button onClick={handleSearch} className="p-2 bg-blue-500 text-white w-full">Search</button>

      {/* Train Results */}
{trains !== null && trains.length > 0 ? (
  <div className="mt-4">
    <h3 className="text-lg mb-2">Available Trains:</h3>
    {trains.map((train) => (
      <div key={train.train_number} className="p-2 border mb-2">
        <a 
          href={`/trains/${train.train_number}`} 
          className="text-blue-500 hover:underline"
        >
          {train.train_name} - {train.train_number}
        </a>
      </div>
    ))}
  </div>
) : trains === null && (
  <div className="mt-4 text-red-500">
    No trains available for the selected route and date.
  </div>
)}

      <Footer />
    </div>
  );
}
