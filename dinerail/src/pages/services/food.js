import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../../../public/StyleSheet/Food.module.css"; 

export default function FoodPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/food-items`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error fetching food items:", err));
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.gridContainer}>
        {items.map((item) => (
          <Link href={`/food/${item.id}`} key={item.id}>
            <div className={styles.card}>
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL + item.image_url}`}
                className={styles.image}
                alt={item.name}
              />
              <h2 className={styles.title}>{item.food_name}</h2>
              <p className={styles.price}>₹{item.price}</p>
              <p className={styles.info}>
                {item.provider_type === "TRAIN_SERVICE"
                  ? `Train: ${item.train_name} (${item.train_number})`
                  : `Station: ${item.station_name}`}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </>
  );
}
