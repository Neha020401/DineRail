import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MyBooking() {

  return (
    <>
      <Navbar />
      <div> MY Bookings</div>
      <Footer />
    </>
  );
}
