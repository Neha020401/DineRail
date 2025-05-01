import Link from "next/link";
import Navbar from "@/components/Navbar";


export default function Services(){

    return (
 <div>
  <Navbar></Navbar>
    <div>
      <Link href={'/services/book'} >Bookings</Link> 
    </div>
    <div>
        <Link href={/services/Order}> Orders </Link>
    </div>
 </div>
    )
}