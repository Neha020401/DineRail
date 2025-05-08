import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../../../../public/StyleSheet/FoodDetails.module.css"; 

export default function FoodDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [food, setFood] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
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

  const handleReview = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/food-review/${food.order_id}/review`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ review: rating, comment: review }),
      }
    );
    const data = await res.json();
    alert(data.message);
  };

  const handleOrder = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/food-items/place`,
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
    } else {
      alert(data.message);
    }
  };

  if (!food) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <img
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL + food.image_url}`}
          alt={food.food_name}
          className={styles.image}
        />
        <h1 className={styles.title}>{food.food_name}</h1>
        <p className={styles.description}>{food.description}</p>
        <p className={styles.price}>₹{food.price}</p>

        <button onClick={handleOrder} className={styles.orderButton}>
          Place & Pay
        </button>
 <div className={styles.orderForm}>
          <h2 className={styles.sectionTitle}>Order Now</h2>
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
            onChange={(e) => setOrder({ ...order, seat_number: e.target.value })}
            className={styles.input}
          />
        </div>
        <div className={styles.reviewSection}>
        <h2 className={styles.sectionTitle}>Leave a Review</h2>
<div className={styles.stars}>
  {[1, 2, 3, 4, 5].map((star) => (
    <span
      key={star}
      className={star <= rating ? styles.starFilled : styles.star}
      onClick={() => setRating(star)}
    >
      ★
    </span>
  ))}
</div>

          <textarea
            className={styles.textarea}
            placeholder="Write your comment"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <button onClick={handleReview} className={styles.reviewButton}>
            Submit Review
          </button>
        </div>

       
      </div>
      <Footer />
    </>
  );
}
