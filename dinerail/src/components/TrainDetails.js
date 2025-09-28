import Navbar from "./Navbar";

// components/TrainDetails.js
export function TrainDetails({ train }) {
  // Safely access running_days and coaches with fallback to empty arrays
  const runningDays = Array.isArray(train.running_days) ? train.running_days.join(', ') : 'Not available';
  const coaches = Array.isArray(train.coaches) ? train.coaches.map(c => `${c.coach_type} (${c.class})`).join(', ') : 'Not available';

  return (
    <div className="p-4 border rounded">
      <h2>{train.train_name} ({train.train_number})</h2>
      <p>From: {train.source_station}</p>
      <p>To: {train.destination_station}</p>
      <p>Running Days: {runningDays}</p>
      <p>Coaches: {coaches}</p>
    </div>   
  );
}
