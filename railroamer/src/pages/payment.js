// frontend/pages/payment.js
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Payment() {
  const [amount, setAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePayment = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/payment/process-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          paymentMethod,
          userId: "dummyUserId", // Replace with actual user ID from auth context
        }),
      });

      const data = await response.json();

      if (data.success) {
        setPaymentStatus("Payment Successful!");
      } else {
        setPaymentStatus("Payment Failed. Try again!");
      }
    } catch (err) {
      setPaymentStatus("Error processing payment. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Payment Page</h2>

        <div className="mb-4">
          <label htmlFor="amount" className="block mb-2">Amount</label>
          <input
            type="number"
            id="amount"
            className="w-full p-2 border rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="paymentMethod" className="block mb-2">Payment Method</label>
          <select
            id="paymentMethod"
            className="w-full p-2 border rounded"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Net Banking">Net Banking</option>
          </select>
        </div>

        <button
          className="w-full bg-blue-600 text-white p-2 rounded"
          onClick={handlePayment}
        >
          Pay Now
        </button>

        {paymentStatus && (
          <div className={`mt-4 text-center ${paymentStatus.includes("Failed") ? "text-red-600" : "text-green-600"}`}>
            {paymentStatus}
          </div>
        )}
      </div>
    </>
  );
}
