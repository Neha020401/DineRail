"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Train, Utensils, ShoppingBag, Upload, Ticket, Package, LogOut } from "lucide-react";

export default function Navbar() {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.role) {
      setUser(storedUser);
      setRole(storedUser.role);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("#user-dropdown")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setRole(null);
    router.push("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Train className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl text-blue-600">DineRail</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex gap-6 items-center">
            <Link href="/services/food" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
              <Utensils className="h-4 w-4" />
              Food
            </Link>
            <Link href="/train" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
              <Train className="h-4 w-4" />
              Train Status
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-blue-600">
              Services
            </Link>

            {/* User Dropdown */}
            {user && (
              <div className="relative" id="user-dropdown">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="text-gray-700 hover:text-blue-600"
                >
                  <FontAwesomeIcon icon={faUser} className="text-xl" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 border">
                    {role === "USER" ? (
                      <>
                        <Link href="/profile/user" className="block px-4 py-2 text-sm hover:bg-gray-100">
                          <FontAwesomeIcon icon={faUser} className="mr-2" />
                          Dashboard
                        </Link>
                        <Link href="/mybookings" className="block px-4 py-2 text-sm hover:bg-gray-100">
                          <Ticket className="inline h-4 w-4 mr-2" />
                          My Bookings
                        </Link>
                        <Link href="/services/myorders" className="block px-4 py-2 text-sm hover:bg-gray-100">
                          <Package className="inline h-4 w-4 mr-2" />
                          My Orders
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link href="/profile/provider" className="block px-4 py-2 text-sm hover:bg-gray-100">
                          <FontAwesomeIcon icon={faUser} className="mr-2" />
                          Dashboard
                        </Link>
                        <Link href="/upload" className="block px-4 py-2 text-sm hover:bg-gray-100">
                          <Upload className="inline h-4 w-4 mr-2" />
                          Upload Food
                        </Link>
                        <Link href="/mystore" className="block px-4 py-2 text-sm hover:bg-gray-100">
                          <ShoppingBag className="inline h-4 w-4 mr-2" />
                          Your Store
                        </Link>
                      </>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut className="inline h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Login Button */}
            {!user && (
              <Link href="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
