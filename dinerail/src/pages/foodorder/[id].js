import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../../../public/StyleSheet/OrderPage.module.css";

export default function OrderPage() {
  const router = useRouter();
  const { id } = router.query;
  const [food, setFood] = useState(null);
  const [order, setOrder] = useState({
    quantity: 1,
    train_name: "",
    train_no: "",
    seat_number: "",
  });

  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/food-items/${id}`)
        .then((res) => res.json())
        .then((data) => setFood(data));
    }
  }, [id]);

  const handleOrder = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/orders/place`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          food_item_id: food.id,
          provider_id: food.provider_id,
          quantity: order.quantity,
          train_name: order.train_name,
          train_no: order.train_no,
          seat_number: order.seat_number,
        }),
      }
    );

    const data = await res.json();
    if (data.order_id) {
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}payments/food/pay`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            booking_id: data.order_id,
            amount: data.total_price,
          }),
        }
      );
      alert("Order placed and paid successfully!");
      router.push("/orders"); // Redirect to orders page after success
    } else {
      alert(data.message);
    }
  };

  if (!food) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Place Your Order</h1>
        <img
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL + food.image_url}`}
          alt={food.food_name}
          className={styles.image}
        />
        <h2 className={styles.subtitle}>{food.food_name}</h2>
        <p className={styles.description}>{food.description}</p>
        <p className={styles.description}>Price: ₹{food.price}</p>

        <div className={styles.form}>
          <input
            type="number"
            placeholder="Quantity"
            value={order.quantity}
            onChange={(e) => setOrder({ ...order, quantity: e.target.value })}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Train Name"
            value={order.train_name}
            onChange={(e) => setOrder({ ...order, train_name: e.target.value })}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Train Number"
            value={order.train_no}
            onChange={(e) => setOrder({ ...order, train_no: e.target.value })}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Seat Number"
            value={order.seat_number}
            onChange={(e) =>
              setOrder({ ...order, seat_number: e.target.value })
            }
            className={styles.input}
          />
          <button onClick={handleOrder} className={styles.orderButton}>
            Place Order & Pay
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
