import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function FoodPage() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/food-items`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error fetching food items:", err));
  }, []);

  const filteredItems = items.filter((item) => {
    const query = search.toLowerCase();
    return (
      item.food_name?.toLowerCase().includes(query) ||
      item.train_name?.toLowerCase().includes(query) ||
      item.station_name?.toLowerCase().includes(query)
    );
  });

  return (
    <div style={{paddingLeft:"40px"}}>
      <Navbar />
      
     <div className="flex justify-center" style={{ margin: "10px",marginBlock:"20px"  }}>
  <input
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search by food, train, or station..."
    className="w-full max-w-md px-4 py-2 border-2 border-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Link href={`/food/${item.id}`} key={item.id}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL + item.image_url}`}
                  alt={item.food_name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-1">{item.food_name}</h2>
                  <p className="text-blue-600 font-bold mb-1">₹{item.price}</p>
                  <p className="text-sm text-gray-600">
                    {item.provider_type === "TRAIN_SERVICE"
                      ? `Train: ${item.train_name} (${item.train_number})`
                      : `Station: ${item.station_name}`}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No food items found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
