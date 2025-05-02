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
          <Link href={"/services/book"} >Bookings</Link>
        </div>
        <div>
        <Link href={"/services/mybookings"} >Your Bookings</Link>
        </div>
          
        <div>
          <Link href={"/services/order"}> Orders </Link>
        </div>
        <div>
        <Link href={"/services/my-orders"}>Your Orders</Link>
        </div>
        
      </div>

      <Footer />
    </div>
  );
}
