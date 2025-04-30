import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../components/Navbar';

export default function TrainStatus() {
  const searchParams = useSearchParams();
  const initialTrain = searchParams.get('train') || '';

  const [trainInput, setTrainInput] = useState(initialTrain);
  const [trainSuggestions, setTrainSuggestions] = useState([]);
  const [trainStatus, setTrainStatus] = useState(null);
  const [trainList, setTrainList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (trainInput.length >= 2) {
      fetch(`/api/train/suggestions?query=${trainInput}`)
        .then(res => res.json())
        .then(setTrainSuggestions);
    } else {
      setTrainSuggestions([]);
    }
  }, [trainInput]);

  useEffect(() => {
    fetch('/api/trains')
      .then(res => res.json())
      .then(setTrainList);
  }, []);

  useEffect(() => {
    if (initialTrain) handleSearch(); // auto-fetch if coming from Trains list
  }, []);

  const handleSearch = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/train/live-status?train=${trainInput}`);
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setTrainStatus(null);
      } else {
        setTrainStatus(data);
        setError(null);
      }
    } catch (err) {
      setError('Failed to fetch train status');
      setTrainStatus(null);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Check Train Status</h2>

        <input
          type="text"
          placeholder="Train Name/Number"
          className="w-full mb-2 p-2 border rounded"
          value={trainInput}
          onChange={(e) => setTrainInput(e.target.value)}
        />
        {trainSuggestions.length > 0 && (
          <ul className="border rounded bg-white shadow max-h-60 overflow-y-auto mb-2">
            {trainSuggestions.map(item => (
              <li key={item.train_number} className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setTrainInput(item.train_number);
                    setTrainSuggestions([]);
                  }}>
                {item.train_number} - {item.train_name}
              </li>
            ))}
          </ul>
        )}

        <button onClick={handleSearch} className="w-full bg-blue-600 text-white p-2 rounded mb-4">
          Check Status
        </button>

        {error && <p className="text-red-600">{error}</p>}
        {trainStatus && (
          <div className="bg-gray-50 p-4 rounded shadow mt-4">
            <h3 className="font-bold mb-2">Train Status</h3>
            <p><strong>Status:</strong> {trainStatus.status}</p>
            <p><strong>Location:</strong> {trainStatus.location}</p>
            <p><strong>Arrival Time:</strong> {trainStatus.arrivalTime}</p>
          </div>
        )}

        <h3 className="text-lg font-semibold mt-8 mb-2">Popular Trains</h3>
        <ul className="divide-y">
          {trainList.map(train => (
            <li key={train.train_number}
                className="p-2 hover:bg-gray-50 cursor-pointer"
                onClick={() => setTrainInput(train.train_number)}>
              {train.train_name} ({train.train_number}) - {train.source} to {train.destination}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
