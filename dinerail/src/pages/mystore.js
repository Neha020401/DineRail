"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../../public/StyleSheet/mystore.module.css";

export default function MyStore() {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch provider's food items
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const id = user.provider.id;
        const role = user.role;
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/food-items/provider`,
          {
            id,
            role,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
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
    <div className={styles.container}>
      <Navbar />
      <h2 className={styles.heading}>My Store</h2>
      <Link href="/upload" className={styles.btnAdd}>
        Add Food Item
      </Link>
      {message && <p className={styles.message}>{message}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : foodItems.length === 0 ? (
        <p>No food items uploaded yet.</p>
      ) : (
        <div className={styles.grid}>
          {foodItems.map((item) => (
            <div key={item.id} className={styles.card}>
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL + item.image_url}`}
                alt={item.name}
                className={styles.image}
              />
              <h3 className={styles.foodName}>{item.name}</h3>
              <p className={styles.description}>{item.description}</p>
              <p className={styles.price}>₹{item.price}</p>
              <button
                onClick={() => handleDelete(item.id)}
                className={styles.btnDelete}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
}
