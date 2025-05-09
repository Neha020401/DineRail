'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // For programmatic navigation
import styles from "../../public/StyleSheet/Navbar.module.css";

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
        <div className={styles.logo}>Railroamer</div>
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
          <Link href="/profile/user" className={styles.navLink}>
            Profile
          </Link>
        )}
        {role === "PROVIDER" && (
          <Link href="/profile/provider" className={styles.navLink}>
            Profile
          </Link>
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
