//pages/mystore.js
"use client";
import React ,{ useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MyStore() {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

// Fetch provider's food items
useEffect(() => {
  const fetchFoodItems = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/food-items/provider`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setFoodItems(response.data);
    } catch (error) {
      console.error("Error fetching food items:", error);
      setMessage("Failed to load food items.");
    } finally {
      setLoading(false);
    }
  };
  fetchFoodItems();
}, []);


  // Delete a food item
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      await axios.delete(`/api/food-items/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setFoodItems((prev) => prev.filter((item) => item.id !== id));
      setMessage("Food item deleted successfully.");
    } catch (error) {
      console.error("Error deleting item:", error);
      setMessage("Failed to delete the item.");
    }
  };

  return (
    <div className="p-5">
        <Navbar/>
      <h2 className="text-2xl font-semibold mb-4">My Store</h2>
      <Link href="/upload">
        <button className="bg-blue-600 text-white p-2 rounded mb-4">Add Food Item</button>
      </Link>
      {message && <p className="text-red-500">{message}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : foodItems.length === 0 ? (
        <p>No food items uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {foodItems.map((item) => (
            <div key={item.id} className="border p-3 rounded shadow">
              <img src={item.image_url} alt={item.name} className="w-full h-32 object-cover rounded mb-2" />
              <h3 className="text-xl font-medium">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-green-600 font-semibold">₹{item.price}</p>
              <button
                onClick={() => handleDelete(item.id)}
                className="mt-2 bg-red-600 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
      <Footer/>
    </div>
  );
}
