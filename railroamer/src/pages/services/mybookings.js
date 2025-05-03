import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Booking() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [trains, setTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [availableSeats, setAvailableSeats] = useState(0);
  const [numSeats, setNumSeats] = useState(1);
  const [passengers, setPassengers] = useState([]);
  const [ticketAmount, setTicketAmount] = useState(0);

  const handleSearchTrains = async () => {
    const options = {
      method: 'GET',
      url: 'https://example-rapidapi-train-endpoint.com/search',
      params: { from, to },
      headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'example-rapidapi-train-endpoint.com'
      }
    };
    const res = await axios.request(options);
    setTrains(res.data.trains || []);
  };

  const handleSelectTrain = async (train) => {
    setSelectedTrain(train);
    // Mock seat data here
    setAvailableSeats(train.available_seats || 50);
    setTicketAmount(train.ticket_price || 100);
  };

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  useEffect(() => {
    setPassengers(Array(numSeats).fill({ name: '', age: '', aadhar: '' }));
  }, [numSeats]);

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Book Your Train</h1>

        {/* Source and Destination */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="From (e.g., Delhi)"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="To (e.g., Mumbai)"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        <button onClick={handleSearchTrains} className="bg-blue-500 text-white px-4 py-2 rounded mb-6">
          Search Trains
        </button>

        {/* Train Dropdown */}
        {trains.length > 0 && (
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Select Train:</label>
            <select
              className="border p-2 w-full rounded"
              onChange={(e) => handleSelectTrain(JSON.parse(e.target.value))}
            >
              <option value="">-- Choose Train --</option>
              {trains.map((train, i) => (
                <option key={i} value={JSON.stringify(train)}>
                  {train.name} ({train.number})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Show Seat Selection and Passenger Details */}
        {selectedTrain && (
          <>
            <div className="mb-4">
              <p><strong>Available Seats:</strong> {availableSeats}</p>
              <p><strong>Ticket Price:</strong> ₹{ticketAmount} per seat</p>
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold">Number of Seats:</label>
              <input
                type="number"
                min="1"
                max={availableSeats}
                value={numSeats}
                onChange={(e) => setNumSeats(Number(e.target.value))}
                className="border p-2 w-full rounded"
              />
            </div>

            <h2 className="text-lg font-semibold mb-2">Passenger Details</h2>
            {passengers.map((p, idx) => (
              <div key={idx} className="border p-4 rounded mb-4">
                <p className="font-medium">Passenger {idx + 1}</p>
                <input
                  type="text"
                  placeholder="Name"
                  className="border p-2 rounded w-full mb-2"
                  onChange={(e) => handlePassengerChange(idx, 'name', e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Age"
                  className="border p-2 rounded w-full mb-2"
                  onChange={(e) => handlePassengerChange(idx, 'age', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Aadhar Number"
                  className="border p-2 rounded w-full"
                  onChange={(e) => handlePassengerChange(idx, 'aadhar', e.target.value)}
                />
              </div>
            ))}

            <div className="mt-6 font-bold text-lg">
              Total Amount: ₹{ticketAmount * numSeats}
            </div>

            {/* Submit Button */}
            <button className="bg-green-600 text-white px-6 py-2 mt-4 rounded">
              Proceed to Payment
            </button>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
