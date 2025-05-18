//frontend/pages/index.js

import Navbar from '../components/Navbar';
import styles from '../../public/StyleSheet/Home.module.css';
import Footer from '@/components/Footer';
import Link from 'next/link';


export default function Home() {
  return (
    <>
      <Navbar />
      <div className={styles.heroSection}>
        {/* <SearchTrain/> */}
        <button >
         <Link href="/trains">explore trains</Link>
           </button>
      </div>
      <Footer/>
    </>
  );
}