import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../../../public/StyleSheet/Booking.module.css"; // Import CSS module

export default function Booking() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [trains, setTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [availableSeats, setAvailableSeats] = useState(0);
  const [numSeats, setNumSeats] = useState(1);
  const [passengers, setPassengers] = useState([]);
  const [ticketAmount, setTicketAmount] = useState(0);

  const handleSearchTrains = async () => {
    try {
      const options = {
        method: "GET",
        url: "https://example-rapidapi-train-endpoint.com/search",
        params: { from, to },
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
          "X-RapidAPI-Host": "example-rapidapi-train-endpoint.com",
        },
      };
      const res = await axios.request(options);
      setTrains(res.data.trains || []);
    } catch (error) {
      console.error("Error fetching trains:", error);
    }
  };

  const handleSelectTrain = (train) => {
    setSelectedTrain(train);
    setAvailableSeats(train.available_seats || 50);
    setTicketAmount(train.ticket_price || 100);
  };

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  useEffect(() => {
    setPassengers(Array(numSeats).fill({ name: "", age: "", aadhar: "" }));
  }, [numSeats]);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.heading}>Book Your Train</h1>

        {/* From and To */}
        <div className={styles.gridTwoCols}>
          <input
            type="text"
            placeholder="From (e.g., Delhi)"
            className={styles.input}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <input
            type="text"
            placeholder="To (e.g., Mumbai)"
            className={styles.input}
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>

        <button className={styles.buttonPrimary} onClick={handleSearchTrains}>
          Search Trains
        </button>

        {/* Train Dropdown */}
        {trains.length > 0 && (
          <div className={styles.trainDropdown}>
            <label className={styles.label}>Select Train:</label>
            <select
              className={styles.select}
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

        {/* Seats and Passenger Info */}
        {selectedTrain && (
          <>
            <div className={styles.infoBox}>
              <p><strong>Available Seats:</strong> {availableSeats}</p>
              <p><strong>Ticket Price:</strong> ₹{ticketAmount} per seat</p>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Number of Seats:</label>
              <input
                type="number"
                min="1"
                max={availableSeats}
                className={styles.input}
                value={numSeats}
                onChange={(e) => setNumSeats(Number(e.target.value))}
              />
            </div>

            <h2 className={styles.subHeading}>Passenger Details</h2>
            {passengers.map((p, idx) => (
              <div key={idx} className={styles.passengerCard}>
                <p className={styles.passengerCardTitle}>Passenger {idx + 1}</p>
                <input
                  type="text"
                  placeholder="Name"
                  className={styles.passengerInput}
                  onChange={(e) =>
                    handlePassengerChange(idx, "name", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Age"
                  className={styles.passengerInput}
                  onChange={(e) =>
                    handlePassengerChange(idx, "age", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Aadhar Number"
                  className={styles.passengerInput}
                  onChange={(e) =>
                    handlePassengerChange(idx, "aadhar", e.target.value)
                  }
                />
              </div>
            ))}

            <div className={styles.totalAmount}>
              Total Amount: ₹{ticketAmount * numSeats}
            </div>

            <button className={styles.proceedButton}>Proceed to Payment</button>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
