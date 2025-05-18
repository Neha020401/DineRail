import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../../public/StyleSheet/Services.module.css";

export default function Services() {
  return (
    <div>
      <Navbar />
      <div className={styles.service}>
        <div>
          <img src="/StyleSheet/images/train.jpg" alt="Bookings" />
          <Link href={"/services/booking"}>Bookings</Link>
        </div>
        <div>
            <img src="/StyleSheet/images/your_booking.jpg" alt="Your Bookings" />
          <Link href={"/services/mybookings"}>Your Bookings</Link>
        </div>
        <div>
            <img src="/StyleSheet/images/food.jpg" alt="Food" />
          <Link href={"/services/food"}>Food</Link>
        </div>
        <div>
           <img src="/StyleSheet/images/your_order.jpg" alt="Your Orders" />
          <Link href={"/services/myorders"}>Your Orders</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
