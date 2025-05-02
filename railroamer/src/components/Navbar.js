import Link from 'next/link';
import styles from '../../public/StyleSheet/Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
   <Link href="/"> <div className={styles.logo}>Railroamer</div></Link>  
      <div className={styles.navLinks}>
        <Link href="/" className={styles.navLink}>Home</Link>
        <Link href="/trains" className={styles.navLink}>Train</Link>
        <Link href="/train-status" className={styles.navLink}>Train-status</Link>
        <Link href="/services" className={styles.navLink}>Services</Link>
        <Link href="/profile/user" className={styles.navLink}>Profile-user</Link>
        <Link href="/profile/provider" className={styles.navLink}>Profile-Provider</Link>
        <Link href="/login" className={styles.navLink}>Login</Link>
        <Link href="/signup" className={styles.navLink}>Sign Up</Link>
      </div>
    </nav>
  );
}