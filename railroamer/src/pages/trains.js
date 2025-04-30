// pages/trains.js
import { useEffect, useState } from "react";
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

  // Hardcoded station data (sample of major stations in India)
  const stationList = [
    { code: "BVI", name: "Borivali" },
    { code: "BJUD", name: "BAJUD" },
    { code: "BJU", name: "BARAUNI JN" },
    { code: "AJUG", name: "ABJUGANJ" },
    { code: "BJUP", name: "BARAUNI BYPASS" },
    { code: "NBJU", name: "NEW BARAUNI JN" },
    { code: "NDLS", name: "New Delhi" },
    { code: "MMCT", name: "Mumbai Central" },
    { code: "CSTM", name: "Chhatrapati Shivaji Maharaj Terminus" },
    { code: "BCT", name: "Bandra Terminus" },
    { code: "MAS", name: "Chennai Egmore" },
    { code: "HZN", name: "Hazrat Nizamuddin" },
    { code: "SBC", name: "Bengaluru City" },
    { code: "ST", name: "Shivaji Nagar" },
    { code: "JBP", name: "Jabalpur" },
    { code: "KOAA", name: "Kolkata" },
    { code: "PNQ", name: "Pune" },
    { code: "ADRA", name: "Adra" },
    { code: "TATA", name: "Tatanagar" },
    { code: "DR", name: "Dadar" },
    { code: "RXL", name: "Raipur" },
    { code: "BLR", name: "Bangalore" },
    { code: "PAT", name: "Patna" },
    { code: "MDU", name: "Madurai" },
    { code: "GAYA", name: "Gaya" },
    { code: "AGC", name: "Agra Cantt" },
    { code: "GNT", name: "Guntur" },
    { code: "LU", name: "Lucknow" },
    { code: "CNB", name: "Kanpur" },
    { code: "FBD", name: "Faridabad" },
    { code: "JAL", name: "Jalandhar" },
    { code: "RJK", name: "Rajkot" },
    { code: "TIR", name: "Tirupati" },
    { code: "VSKP", name: "Visakhapatnam" },
    { code: "BBS", name: "Bhubaneswar" },
    { code: "DBO", name: "Dibrugarh" },
    { code: "NJP", name: "New Jalpaiguri" },
    { code: "VD", name: "Vadodara" },
    { code: "SBP", name: "Sambalpur" },
    { code: "CBE", name: "Coimbatore" },
    { code: "MYS", name: "Mysuru" },
    { code: "JNE", name: "Jalna" },
    { code: "SRR", name: "Srirampur" },
    { code: "KGP", name: "Kharagpur" },
    { code: "UDZ", name: "Udaipur" },
    { code: "HBL", name: "Hubballi" },
    { code: "SBH", name: "Siliguri" },
    { code: "BHI", name: "Bhuj" },
    { code: "CKP", name: "Chakradharpur" },
    { code: "LKO", name: "Lucknow" },
    { code: "AII", name: "Ajmer" },
    { code: "PURI", name: "Puri" },
    { code: "HYD", name: "Hyderabad" },
    { code: "BPL", name: "Bhopal" },
    { code: "NR", name: "Narayanpet" },
    { code: "KIR", name: "Kolkata" },
    { code: "SA", name: "Secunderabad" },
    { code: "RNC", name: "Ranchi" },
    { code: "BLG", name: "Balurghat" },
    // Add more stations as needed
  ];

  // Fetch trains based on selected station codes and journey date
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
            "x-rapidapi-key": `c10e55fbd5msh26028e21007779ep1380bdjsn49b287dffc06`,
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
      <div className="max-w-4xl mx-auto mt-8 p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">
          Search Trains Between Stations
        </h2>
        <form
          onSubmit={handleSubmit}
          className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* From Station Dropdown */}
          <div>
            <select
              value={fromStationCode}
              onChange={(e) => setFromStationCode(e.target.value)}
              className="border rounded p-2 w-full"
            >
              <option value="">Select From Station</option>
              {stationList.map((station) => (
                <option key={station.code} value={station.code}>
                  {station.name} ({station.code})
                </option>
              ))}
            </select>
          </div>

          {/* To Station Dropdown */}
          <div>
            <select
              value={toStationCode}
              onChange={(e) => setToStationCode(e.target.value)}
              className="border rounded p-2 w-full"
            >
              <option value="">Select To Station</option>
              {stationList.map((station) => (
                <option key={station.code} value={station.code}>
                  {station.name} ({station.code})
                </option>
              ))}
            </select>
          </div>

          {/* Date of Journey */}
          <input
            type="date"
            value={dateOfJourney}
            onChange={(e) => setDateOfJourney(e.target.value)}
            className="border rounded p-2"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="col-span-1 md:col-span-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {loading ? "Searching..." : "Find Trains"}
          </button>
        </form>

        {/* Display the list of trains */}
        <ul className="divide-y">
          {trains.map((train) => (
            <li
              key={train.train_number}
              className="p-3 hover:bg-gray-50 cursor-pointer"
              onClick={() =>
                router.push(`/train-status?train=${train.train_number}`)
              }
            >
              <p className="font-semibold">
                {train.train_name} ({train.train_number})
              </p>
              <p className="text-gray-600">
                {train.from_station_name} → {train.to_station_name}
              </p>
              <p className="text-sm text-gray-500">
                Departure: {train.from_std} | Arrival: {train.to_sta}
              </p>
              <p className="text-sm text-gray-500">
                Duration: {train.duration} | Distance: {train.distance} km
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
