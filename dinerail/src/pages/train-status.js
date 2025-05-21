import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';
import styles from '../../public/StyleSheet/train-statue.module.css'; // Import custom CSS file
// import Trains from './train';

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
    
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.heading}>Live Train Status</h2>

          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Enter Train Name or Number"
              className={styles.input}
              value={trainInput}
              onChange={(e) => setTrainInput(e.target.value)}
            />

            {trainSuggestions.length > 0 && (
              <ul className={styles.suggestions}>
                {trainSuggestions.map((item) => (
                  <li
                    key={item.train_number}
                    className={styles.suggestionItem}
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

            <button onClick={handleSearch} className={styles.button}>
              Check Status
            </button>

            {error && <div className={styles.error}>{error}</div>}
          </div>

          {trainStatus && (
            <div className={styles.trainDetails}>
              <h3 className={styles.subHeading}>Train Details</h3>
              <div className={styles.detailsGrid}>
                <p>
                  <span className={styles.bold}>Train:</span>{' '}
                  {trainStatus.trainName} ({trainStatus.trainNumber})
                </p>
                <p>
                  <span className={styles.bold}>Current Station:</span>{' '}
                  {trainStatus.currentStation}
                </p>
                <p>
                  <span className={styles.bold}>ETA:</span>{' '}
                  {trainStatus.eta}
                </p>
                <p>
                  <span className={styles.bold}>ETD:</span>{' '}
                  {trainStatus.etd}
                </p>
                <p>
                  <span className={styles.bold}>Platform:</span>{' '}
                  {trainStatus.platform}
                </p>
                <p>
                  <span className={styles.bold}>Delay:</span>{' '}
                  {trainStatus.delay} minutes
                </p>
                <p>
                  <span className={styles.bold}>Status as of:</span>{' '}
                  {trainStatus.statusAsOf}
                </p>
                <p>
                  <span className={styles.bold}>Next Stop Info:</span>{' '}
                  {trainStatus.nextStopInfo}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Popular Trains - Can be enhanced later */}
        {trainList.length > 0 && (
          <div className={styles.popularTrains}>
            <h3 className={styles.subHeading}>Popular Trains</h3>
            <ul className={styles.trainList}>
              {trainList.map((train) => (
                <li
                  key={train.train_number}
                  className={styles.trainItem}
                  onClick={() => setTrainInput(train.train_number)}
                >
                  <div className={styles.trainInfo}>
                    <strong>{train.train_name}</strong> ({train.train_number})<br />
                    <span className={styles.trainRoute}>
                      {train.source} → {train.destination}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <Footer/>
    </>
  );
}
