// pages/trains.js
import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function Trains() {
  const [trains, setTrains] = useState([]);
  const [fromStationCode, setFromStationCode] = useState("");
  const [toStationCode, setToStationCode] = useState("");
  const [dateOfJourney, setDateOfJourney] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const stationList = [
    { code: "BVI", name: "Borivali" },
    { code: "NDLS", name: "New Delhi" },
    { code: "MMCT", name: "Mumbai Central" },
    { code: "CSTM", name: "Chhatrapati Shivaji Maharaj Terminus" },
    { code: "BDTS", name: "Bandra Terminus" },
    { code: "MS", name: "Chennai Egmore" },
    { code: "NZM", name: "Hazrat Nizamuddin" },
    { code: "SBC", name: "Bengaluru City" },
    { code: "JBP", name: "Jabalpur" },
    { code: "KOAA", name: "Kolkata" },
    { code: "PNQ", name: "Pune" },
    { code: "TATA", name: "Tatanagar" },
    { code: "DR", name: "Dadar" },
    { code: "PAT", name: "Patna" },
    { code: "MDU", name: "Madurai" },
    { code: "AGC", name: "Agra Cantt" },
    { code: "CNB", name: "Kanpur" },
    { code: "LU", name: "Lucknow" },
    { code: "JAL", name: "Jalandhar" },
    { code: "VSKP", name: "Visakhapatnam" },
    { code: "BBS", name: "Bhubaneswar" },
    { code: "CBE", name: "Coimbatore" },
    { code: "MYS", name: "Mysuru" },
    { code: "KGP", name: "Kharagpur" },
    { code: "UDZ", name: "Udaipur" },
    { code: "PURI", name: "Puri" },
    { code: "HYD", name: "Hyderabad" },
    { code: "BPL", name: "Bhopal" },
    { code: "RNC", name: "Ranchi" },
  ];

  const fetchTrains = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations",
        {
          params: {
            fromStationCode,
            toStationCode,
            dateOfJourney,
          },
          headers: {
            "x-rapidapi-key": `${process.env.NEXT_PUBLIC_RAPIDAPI_KEY}`,
            "x-rapidapi-host": "irctc1.p.rapidapi.com",
          },
        }
      );
      if (response.data.status) {
        setTrains(response.data.data);
      } else {
        setTrains([]);
        alert("No trains found");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch train data");
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fromStationCode || !toStationCode || !dateOfJourney) {
      alert("Please fill all fields");
      return;
    }
    fetchTrains();
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <div className="bg-white shadow-xl rounded-2xl p-6">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">
            Search Trains Between Stations
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            <select
              value={fromStationCode}
              onChange={(e) => setFromStationCode(e.target.value)}
              className="border border-blue-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select From Station</option>
              {stationList.map((station) => (
                <option key={station.code} value={station.code}>
                  {station.name} ({station.code})
                </option>
              ))}
            </select>

            <select
              value={toStationCode}
              onChange={(e) => setToStationCode(e.target.value)}
              className="border border-blue-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select To Station</option>
              {stationList.map((station) => (
                <option key={station.code} value={station.code}>
                  {station.name} ({station.code})
                </option>
              ))}
            </select>

            <input
              type="date"
              value={dateOfJourney}
              onChange={(e) => setDateOfJourney(e.target.value)}
              className="border border-blue-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="md:col-span-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              {loading ? "Searching..." : "Find Trains"}
            </button>
          </form>

          {/* Train Table */}
          {trains.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-blue-100 text-blue-800 text-left">
                    <th className="py-3 px-4 border">Train</th>
                    <th className="py-3 px-4 border">From → To</th>
                    <th className="py-3 px-4 border">Departure</th>
                    <th className="py-3 px-4 border">Arrival</th>
                    <th className="py-3 px-4 border">Duration</th>
                    <th className="py-3 px-4 border">Distance</th>
                  </tr>
                </thead>
                <tbody>
                  {trains.map((train) => (
                    <tr
                      key={train.train_number}
                      onClick={() =>
                        router.push(`/train-status?train=${train.train_number}`)
                      }
                      className="hover:bg-blue-50 cursor-pointer transition"
                    >
                      <td className="py-2 px-4 border font-medium text-blue-600">
                        {train.train_name} ({train.train_number})
                      </td>
                      <td className="py-2 px-4 border">
                        {train.from_station_name} → {train.to_station_name}
                      </td>
                      <td className="py-2 px-4 border">{train.from_std}</td>
                      <td className="py-2 px-4 border">{train.to_sta}</td>
                      <td className="py-2 px-4 border">{train.duration}</td>
                      <td className="py-2 px-4 border">{train.distance} km</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            !loading && (
              <p className="text-gray-500 text-center mt-6">
                No trains to display. Please search above.
              </p>
            )
          )}
        </div>
      </div>
    </>
  );
}
