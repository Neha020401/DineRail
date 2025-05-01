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
          <Link href={"/services/book"}>Bookings</Link>
        </div>
        <div>Your Bookings</div>
        <div>
          <Link href={"/services/Order"}> Orders </Link>
        </div>
        <div>Your orders</div>
      </div>

      <Footer />
    </div>
  );
}
