"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import styles from "../../public/StyleSheet/Navbar.module.css";
import '../../public/StyleSheet/Navbar.module.css';

export default function Navbar() {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false); // User dropdown state
  const [isProviderDropdownOpen, setIsProviderDropdownOpen] = useState(false); // Provider dropdown state
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

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.profileContainer}`)) {
        setIsUserDropdownOpen(false);
        setIsProviderDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    setIsProviderDropdownOpen(false); // Close provider dropdown if open
  };

  const toggleProviderDropdown = () => {
    setIsProviderDropdownOpen(!isProviderDropdownOpen);
    setIsUserDropdownOpen(false); // Close user dropdown if open
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setRole(null);
    router.push("/login");
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <div className={styles.logo}>DineRail</div>
      </Link>
      <div className={styles.navLinks}>
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
          <div className={styles.profileContainer}>
            <button
              className={`${styles.navLink} ${styles.profilenav} ${
                isUserDropdownOpen ? styles.active : ""
              }`}
              onClick={toggleUserDropdown}
            >
              <FontAwesomeIcon icon={faUser} />
            </button>
            {isUserDropdownOpen && (
              <div className={styles.dropdown}>
                <Link href="/profile/user" className={styles.navLink}>
                  Dashboard
                </Link>
                <Link href="/mybookings" className={styles.navLink}>
                  My Bookings
                </Link>
                <Link href="/services/myorders" className={styles.navLink}>
                  My Orders
                </Link>
              </div>
            )}
          </div>
        )}

        {role === "PROVIDER" && (
          <div className={styles.profileContainer}>
            <button
              className={`${styles.navLink} ${styles.profilenav} ${
                isProviderDropdownOpen ? styles.active : ""
              }`}
              onClick={toggleProviderDropdown}
            >
              <FontAwesomeIcon icon={faUser} />
            </button>
            {isProviderDropdownOpen && (
              <div className={styles.dropdown}>
                <Link href="/profile/provider" className={styles.navLink}>
                  Dashboard
                </Link>
                <Link href="/upload" className={styles.navLink}>
                  Upload Food
                </Link>
                <Link href="/store" className={styles.navLink}>
                  Your Store
                </Link>
              </div>
            )}
          </div>
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
