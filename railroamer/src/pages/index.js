//frontend/pages/index.js

import Navbar from '../components/Navbar';
import styles from '../../public/StyleSheet/Home.module.css';
import Footer from '@/components/Footer';
import Trains from './trains'

export default function Home() {
  return (
    <>
      <Navbar />
      <div className={styles.heroSection}>
        <Trains/>
      </div>
      <Footer/>
    </>
  );
}