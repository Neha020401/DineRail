// pages/profile-provider.js
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import axios from "axios";

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

  const handleLogout = async () => {
    localStorage.removeItem("token");
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/logout`);
    router.push("/login");
  };

  if (!provider) return <div className="p-8">Loading...</div>;

  return (
    <>
    <Navbar/>
    
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Provider Profile</h1>
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
      <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      ><Link href={'/upload'}>Upload Food</Link></button>
      </div>
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
    <Footer/>
    </>
  );
}
