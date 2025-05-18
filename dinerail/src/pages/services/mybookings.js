// Next.js Frontend - BookingDetails page
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BookingDetails() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/bookings`)
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load bookings");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <>
        <Navbar />
      <center><div>Loading...</div></center>  
        <Footer />
      </>
    );
  if (error) return <div>{error}</div>;

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">My Booking Details</h2>
        {bookings.length === 0 ? (
          <div>No bookings found.</div>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking.id}
              className="border p-4 mb-4 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold">
                Train From: {booking.train_from} To: {booking.train_to}
              </h3>
              <p>Fare: ₹{booking.fare}</p>
              <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
              <p>Seat Type: {booking.seat_type}</p>
              <p>
                Passenger: {booking.passenger_name} (Age: {booking.age}, Gender:{" "}
                {booking.gender})
              </p>
              <p>Address: {booking.address}</p>
              <p>
                Payment Amount: ₹{booking.amount} - Status: {booking.status}
              </p>
            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
}
