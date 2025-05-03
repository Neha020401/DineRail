"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { User, Building2, Mail, Lock, Loader2 } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("USER")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const endpoint =
        role === "USER"
          ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/user/login`
          : `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/provider/login`
      const res = await axios.post(endpoint, { email, password })
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data))
      console.log(res.data);
      router.push(role === "USER" ? "/profile/user" : "/profile/provider")
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || "Unknown error"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 md:py-20 flex-grow flex items-center justify-center">
        <div className="w-full max-w-3xl">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3 tracking-tight">Welcome Back</h1>
            <p className="text-slate-600 max-w-md mx-auto text-base md:text-lg leading-relaxed">
              Log in to access your personalized services and features.
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 transition-all duration-300 hover:shadow-2xl">
            {/* Role Selection */}
            <div className="flex flex-col sm:flex-row border-b border-slate-200">
              <div
                className={`flex-1 cursor-pointer transition-all duration-200 ${
                  role === "USER"
                    ? "bg-blue-50 border-b-2 sm:border-b-0 sm:border-r-2 border-blue-600"
                    : "bg-white hover:bg-slate-50"
                }`}
                onClick={() => setRole("USER")}
              >
                <div className="flex items-center p-5 md:p-6">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      role === "USER"
                        ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                        : "bg-slate-100 text-slate-500"
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
                className={`flex-1 cursor-pointer transition-all duration-200 ${
                  role === "PROVIDER"
                    ? "bg-blue-50 border-t-2 sm:border-t-0 sm:border-l-2 border-blue-600"
                    : "bg-white hover:bg-slate-50"
                }`}
                onClick={() => setRole("PROVIDER")}
              >
                <div className="flex items-center p-5 md:p-6">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      role === "PROVIDER"
                        ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                        : "bg-slate-100 text-slate-500"
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
            <div className="p-6 md:p-10">
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                    <Mail size={20} />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-5 py-4 text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base transition-all duration-200 focus:bg-white"
                    required
                  />
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                    <Lock size={20} />
                  </div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-5 py-4 text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base transition-all duration-200 focus:bg-white"
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <a
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    type="submit"
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg shadow-blue-100 hover:shadow-blue-200 text-base w-full max-w-sm transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : null}
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>
              </form>

              {/* Signup Link */}
              <div className="text-center mt-8">
                <p className="text-slate-600 text-base">
                  Don't have an account?{" "}
                  <a
                    href="/signup"
                    className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition-colors"
                  >
                    Sign up
                  </a>
                </p>
              </div>

              {/* Social Login Options */}
              <div className="mt-8">
                <div className="relative flex items-center justify-center">
                  <div className="border-t border-slate-200 absolute w-full"></div>
                  <span className="bg-white px-4 text-sm text-slate-500 relative">Or continue with</span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="flex items-center justify-center py-3 px-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 font-medium"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center py-3 px-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 font-medium"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        fill="#1877F2"
                      />
                      <path
                        d="M15.893 14.89l.443-2.89h-2.773v-1.876c0-.791.387-1.562 1.63-1.562h1.26v-2.46s-1.144-.195-2.238-.195c-2.285 0-3.777 1.384-3.777 3.89V12h-2.54v2.89h2.54v6.988a10.06 10.06 0 003.124 0v-6.988h2.33z"
                        fill="#ffffff"
                      />
                    </svg>
                    Facebook
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Security Note */}
          <div className="mt-8 text-center">
            <p className="text-xs text-slate-500 flex items-center justify-center">
              <Lock size={14} className="mr-1" />
              Your connection is secure. We use industry-standard encryption to protect your data.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
