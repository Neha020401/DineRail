import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../../../public/StyleSheet/OrderPage.module.css"; // Reuse existing styles
import { useRouter } from "next/router";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/orders/user`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await res.json();
        if (res.ok) {
          setOrders(data);
        } else {
          alert(data.error || "Failed to fetch orders");
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        alert("Error fetching orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;

  return (
    <> 
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Your Orders</h1>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className={styles.ordersList} x>
            {orders.map((order) => (
              <div key={order.id} className={styles.orderCard}>
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${order.image_url}`}
                  alt={order.food_name}
                  className={styles.image}
                />
                <div>
                  <div style={{ display:"block",position:"relative"}}>
                  <h2 className={styles.subtitle}>{order.food_name}</h2>
                  <p className={styles.description}>
                    Train: {order.train_name} ({order.train_no})
                  </p>
                  <p className={styles.description}>
                    Seat No: {order.seat_number}
                  </p>
                  <p className={styles.description}>
                    Quantity: {order.quantity}
                  </p>
                  <p className={styles.description}>
                    Total Price: ₹{order.total_price}
                  </p>
                  <p className={styles.description}>
                    Status: <strong>{order.status}</strong>
                  </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
