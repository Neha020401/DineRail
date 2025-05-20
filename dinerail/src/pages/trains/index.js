

'use client';
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

  // Station array
  const stations = [
    { "code": "NDLS", "name": "New Delhi" },
    { "code": "BCT", "name": "Mumbai Central" },
    { "code": "MMCT", "name": "Mumbai Central" },
    { "code": "HBJ", "name": "Habibganj (Bhopal)" },
    { "code": "SBC", "name": "Bengaluru City" },
    { "code": "DBG", "name": "Darbhanga" },
    { "code": "HWH", "name": "Howrah" },
    { "code": "NZM", "name": "Hazrat Nizamuddin" },
    { "code": "TVC", "name": "Trivandrum" },
    { "code": "PURI", "name": "Puri" },
    { "code": "JAT", "name": "Jammu Tawi" },
    { "code": "ERS", "name": "Ernakulam" },
    { "code": "CSMT", "name": "Mumbai CST" },
    { "code": "MAS", "name": "Chennai Central" },
    { "code": "DNR", "name": "Danapur" },
    { "code": "PUNE", "name": "Pune" },
    { "code": "BDTS", "name": "Bandra Terminus" },
    { "code": "ASR", "name": "Amritsar" }
  ];

  const handleSearch = async () => {
    try {
      const response = await api.post('/trains/', { from, to, date });
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

      {/* From Station Dropdown */}
      <select
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="p-2 border w-full mb-2"
      >
        <option value="" disabled>Select From Station</option>
        {stations.map((station) => (
          <option key={station.code} value={station.code}>
            {station.name} ({station.code})
          </option>
        ))}
      </select>

      {/* To Station Dropdown */}
      <select
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="p-2 border w-full mb-2"
      >
        <option value="" disabled>Select To Station</option>
        {stations.map((station) => (
          <option key={station.code} value={station.code}>
            {station.name} ({station.code})
          </option>
        ))}
      </select>

      {/* Date Picker */}
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
