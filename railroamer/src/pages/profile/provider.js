// pages/profile-provider.js
"use client";

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
        const res = await axios.get("http://localhost:5000/api/provider/profile", {
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
    await axios.post("http://localhost:5000/api/auth/logout");
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
      <div><Link href={'/upload'}>Upload Food</Link></div>
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
