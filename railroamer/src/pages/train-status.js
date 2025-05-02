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
    if (initialTrain) handleSearch();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://irctc1.p.rapidapi.com/api/v1/liveTrainStatus?trainNo=${trainInput}&startDay=1`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': `${process.env.NEXT_PUBLIC_RAPIDAPI_KEY}`,
            'x-rapidapi-host': 'irctc1.p.rapidapi.com',
          },
        }
      );

      const data = await response.json();

      if (!data.status || !data.data) {
        setError(data.message || 'Train not found');
        setTrainStatus(null);
      } else {
        const d = data.data;
        setTrainStatus({
          trainNumber: d.train_number,
          trainName: d.train_name,
          currentStation: d.current_station_name,
          eta: d.eta,
          etd: d.etd,
          platform: d.platform_number,
          delay: d.delay,
          statusAsOf: d.status_as_of,
          nextStopInfo:
            d.upcoming_stations?.[0]?.distance_from_current_station_txt || 'N/A',
        });
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
      <div className="max-w-3xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            Live Train Status
          </h2>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Enter Train Name or Number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={trainInput}
              onChange={(e) => setTrainInput(e.target.value)}
            />

            {trainSuggestions.length > 0 && (
              <ul className="border rounded-md bg-white shadow max-h-60 overflow-y-auto">
                {trainSuggestions.map((item) => (
                  <li
                    key={item.train_number}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setTrainInput(item.train_number);
                      setTrainSuggestions([]);
                    }}
                  >
                    {item.train_number} - {item.train_name}
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
            >
              Check Status
            </button>

            {error && (
              <div className="text-red-600 font-medium mt-2">{error}</div>
            )}
          </div>

          {trainStatus && (
            <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Train Details
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <p>
                  <span className="font-semibold">Train:</span>{' '}
                  {trainStatus.trainName} ({trainStatus.trainNumber})
                </p>
                <p>
                  <span className="font-semibold">Current Station:</span>{' '}
                  {trainStatus.currentStation}
                </p>
                <p>
                  <span className="font-semibold">ETA:</span>{' '}
                  {trainStatus.eta}
                </p>
                <p>
                  <span className="font-semibold">ETD:</span>{' '}
                  {trainStatus.etd}
                </p>
                <p>
                  <span className="font-semibold">Platform:</span>{' '}
                  {trainStatus.platform}
                </p>
                <p>
                  <span className="font-semibold">Delay:</span>{' '}
                  {trainStatus.delay} minutes
                </p>
                <p>
                  <span className="font-semibold">Status as of:</span>{' '}
                  {trainStatus.statusAsOf}
                </p>
                <p>
                  <span className="font-semibold">Next Stop Info:</span>{' '}
                  {trainStatus.nextStopInfo}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Popular Trains - Can be enhanced later */}
        {trainList.length > 0 && (
          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Popular Trains
            </h3>
            <ul className="divide-y divide-gray-200 border rounded-md bg-white shadow">
              {trainList.map((train) => (
                <li
                  key={train.train_number}
                  className="p-3 hover:bg-gray-50 cursor-pointer transition"
                  onClick={() => setTrainInput(train.train_number)}
                >
                  <div className="text-sm">
                    <strong>{train.train_name}</strong> ({train.train_number})<br />
                    <span className="text-gray-500 text-xs">
                      {train.source} → {train.destination}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
