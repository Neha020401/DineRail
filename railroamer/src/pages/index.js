import Navbar from '../components/Navbar';
import styles from '../../public/StyleSheet/Home.module.css';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Welcome to Railroamer🚂</h1>
      </div>
    </>
  );
}