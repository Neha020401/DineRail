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
       <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
  <Link href="/trains">Explore Trains</Link>
</button>

      </div>
      <Footer/>
    </>
  );
}