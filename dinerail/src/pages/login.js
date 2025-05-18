"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import styles from "../../public/StyleSheet/Login.module.css"
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
      const res = await axios.post(endpoint, { email, password,role })
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data))
      
      router.push(role === "USER" ? "/profile/user" : "/profile/provider")
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || "Unknown error"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Log in to access your personalized services and features.</p>

          <div className={styles.roleSwitch}>
            <div
              className={`${styles.roleOption} ${role === "USER" ? styles.activeRole : ""}`}
              onClick={() => setRole("USER")}
            >
              <User size={20} />
              <span>Passenger</span>
            </div>
            <div
              className={`${styles.roleOption} ${role === "PROVIDER" ? styles.activeRole : ""}`}
              onClick={() => setRole("PROVIDER")}
            >
              <Building2 size={20} />
              <span>Service Provider</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className={styles.form}>
            <div className={styles.inputGroup}>
              <Mail size={18} className={styles.icon} />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <Lock size={18} className={styles.icon} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className={styles.forgot}>
              <a href="/forgot-password">Forgot password?</a>
            </div>

            <button type="submit" disabled={loading} className={styles.loginBtn}>
              {loading ? <Loader2 className={styles.spinner} /> : "Login"}
            </button>
          </form>

          <div className={styles.signupLink}>
            Don't have an account? <a href="/signup">Sign up</a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
