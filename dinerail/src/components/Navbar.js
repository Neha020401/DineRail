"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // For programmatic navigation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import styles from "../../public/StyleSheet/Navbar.module.css";
import '../../public/StyleSheet/Navbar.module.css';

export default function Navbar() {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser?.role) {
        setUser(storedUser);
        setRole(storedUser.role);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setRole(null);
    router.push("/login");
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/">
        {" "}
        <div className={styles.logo}>DineRail</div>
      </Link>
      <div className={styles.navLinks}>
        {/* <Link href="/trains" className={styles.navLink}>Train</Link> */}
        <Link href="./services/food" className={styles.navLink}>
          Food
        </Link>
        <Link href="/train-status" className={styles.navLink}>
          Train-status
        </Link>
        <Link href="/services" className={styles.navLink}>
          Services
        </Link>
        {role === "USER" && (
          <div >
            <Link href="/profile/user" className={styles.navLink}>
             <FontAwesomeIcon icon={faUser} /> 
            </Link>
            <div className={styles.profileHover}>
              <div>
                <Link href={"/services/mybookings"} className={styles.navLink}>
                  my bookings
                </Link>
              </div>
              <div>
                <Link href={"/services/myorders"} className={styles.navLink}>
                  my orders
                </Link>
              </div>
            </div>
          </div>
        )}
        {role === "PROVIDER" && (
          <>
            <Link href="/profile/provider" className={`${styles.navLink} ${styles.profilenav}`}>
             <FontAwesomeIcon icon={faUser} /> 
            </Link>
            <div>
              <Link href={"/upload"} className={styles.navLink}>
                {" "}
                Upload food
              </Link>
              <Link href={"/store"} className={styles.navLink}>
                {" "}
                Your Store
              </Link>
            </div>
          </>
        )}

        {!user ? (
          <Link href="/login" className={styles.navLink}>
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className={styles.navLink}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
