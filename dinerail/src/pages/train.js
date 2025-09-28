"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from '../../public/StyleSheet/Trains.module.css'; 
import Navbar from "@/components/Navbar";

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
            "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
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
   <Navbar/>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>🚆 Find Trains Between Stations</h1>

          <form
            onSubmit={handleSubmit}
            className={styles.form}
          >
            <div>
              <label className={styles.label}>From Station</label>
              <select
                value={fromStationCode}
                onChange={(e) => setFromStationCode(e.target.value)}
                className={styles.select}
              >
                <option value="">Select From Station</option>
                {stationList.map((station) => (
                  <option key={station.code} value={station.code}>
                    {station.name} ({station.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={styles.label}>To Station</label>
              <select
                value={toStationCode}
                onChange={(e) => setToStationCode(e.target.value)}
                className={styles.select}
              >
                <option value="">Select To Station</option>
                {stationList.map((station) => (
                  <option key={station.code} value={station.code}>
                    {station.name} ({station.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={styles.label}>Journey Date</label>
              <input
                type="date"
                value={dateOfJourney}
                onChange={(e) => setDateOfJourney(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.submitContainer}>
              <button
                type="submit"
                className={styles.submitButton}
              >
                {loading ? "Searching..." : "Find Trains"}
              </button>
            </div>
          </form>

          {trains.length > 0 ? (
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.tableHeader}>Train</th>
                    <th className={styles.tableHeader}>From → To</th>
                    <th className={styles.tableHeader}>Departure</th>
                    <th className={styles.tableHeader}>Arrival</th>
                    <th className={styles.tableHeader}>Duration</th>
                    <th className={styles.tableHeader}>Distance</th>
                  </tr>
                </thead>
                <tbody>
                  {trains.map((train) => (
                    <tr
                      key={train.train_number}
                      onClick={() =>
                        router.push(`/train-status?train=${train.train_number}`)
                      }
                      className={styles.tableRow}
                    >
                      <td className={styles.tableData}>
                        {train.train_name} ({train.train_number})
                      </td>
                      <td className={styles.tableData}>
                        {train.from_station_name} → {train.to_station_name}
                      </td>
                      <td className={styles.tableData}>{train.from_std}</td>
                      <td className={styles.tableData}>{train.to_sta}</td>
                      <td className={styles.tableData}>{train.duration}</td>
                      <td className={styles.tableData}>{train.distance} km</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            !loading && (
              <p className={styles.noTrainsMessage}>
                No trains found. Please search with valid inputs.
              </p>
            )
          )}
        </div>
      </div>
    </>
  );
}
