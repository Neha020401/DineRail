// provider profile 

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import axios from "axios";
import styles from "../../../public/StyleSheet/provider.module.css"; // Import CSS module

export default function ProviderProfile() {
  const router = useRouter();
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/provider/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProvider(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch profile");
      }
    };

    fetchProfile();
  }, []);

  if (!provider) return <div className={styles.loading}>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Provider Profile</h1>
        <p><strong>Name:</strong> {provider.name}</p>
        <p><strong>Email:</strong> {provider.email}</p>
        <p><strong>Type:</strong> {provider.provider_type}</p>
        {provider.provider_type === "TRAIN_SERVICE" ? (
          <>
            <p><strong>Train Name:</strong> {provider.train_name}</p>
            <p><strong>Train Number:</strong> {provider.train_number}</p>
          </>
        ) : (
          <p><strong>Station Name:</strong> {provider.station_name}</p>
        )}
        <div>
          <Link href="/upload" className={styles.uploadBtn}>Upload Food</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
