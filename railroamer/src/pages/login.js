"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { User, Building2, Mail, Lock } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint =
        role === "USER"
          ? "http://localhost:5000/api/auth/user/login"
          : "http://localhost:5000/api/auth/provider/login";
      const res = await axios.post(endpoint, { email, password });
      localStorage.setItem("token", res.data.token);
      router.push(role === "USER" ? "/profile/user" : "/profile/provider");
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50 flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 md:py-24 flex-grow flex items-center justify-center">
        <div className="w-full max-w-3xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-slate-600 max-w-md mx-auto text-base leading-relaxed">
              Log in to access your personalized services and features.
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-100">
            {/* Role Selection */}
            <div className="flex border-b border-slate-200">
              <div
                className={`flex-1 cursor-pointer transition-all ${
                  role === "USER" ? "bg-blue-50 border-b-2 border-blue-600" : "bg-white hover:bg-slate-50"
                }`}
                onClick={() => setRole("USER")}
              >
                <div className="flex items-center p-6">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      role === "USER" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <User size={22} />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-lg text-slate-800">Passenger</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mt-1">Access your bookings and services</p>
                  </div>
                </div>
              </div>

              <div
                className={`flex-1 cursor-pointer transition-all ${
                  role === "PROVIDER" ? "bg-blue-50 border-b-2 border-blue-600" : "bg-white hover:bg-slate-50"
                }`}
                onClick={() => setRole("PROVIDER")}
              >
                <div className="flex items-center p-6">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      role === "PROVIDER" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <Building2 size={22} />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-lg text-slate-800">Service Provider</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mt-1">Manage your train or vending services</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Container */}
            <div className="p-8 md:p-12">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-slate-400">
                    <Mail size={20} />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-5 py-3.5 text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-slate-400">
                    <Lock size={20} />
                  </div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-5 py-3.5 text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                    required
                  />
                </div>

                <div className="mt-10 flex justify-center">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center shadow-sm text-base w-full max-w-sm"
                    disabled={loading}
                  >
                    {loading ? (
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : null}
                    Login
                  </button>
                </div>
              </form>

              {/* Signup Link */}
              <div className="text-center mt-8">
                <p className="text-slate-600 text-base">
                  Don't have an account?{" "}
                  <a href="/signup" className="text-blue-600 font-medium hover:underline">
                    Sign up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}