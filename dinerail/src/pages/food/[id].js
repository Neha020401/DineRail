import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../../../public/StyleSheet/FoodDetails.module.css";

export default function FoodDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [food, setFood] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/food-items/${id}`)
        .then((res) => res.json())
        .then((data) => setFood(data));
    }
  }, [id]);

  const handleReview = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/orders/${food.order_id}/review`,
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
    } catch (error) {
      alert("Error submitting review");
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
        <button
          onClick={() => router.push(`/foodorder/${food.id}`)}
          className={styles.orderButton}
        >
          Order Now
        </button>
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
