// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const endpoint = role === 'USER' ? 'http://localhost:5000/api/auth/user/login' : 'http://localhost:5000/api/auth/provider-login';
      const res = await axios.post(endpoint, { email, password });
      localStorage.setItem('token', res.data.token);
      router.push(role === 'USER' ? '/profile-user' : '/provider/profile');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96 space-y-4">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full border px-3 py-2">
          <option value="USER">User</option>
          <option value="PROVIDER">Provider</option>
        </select>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 w-full rounded">
          Login
        </button>
      </form>
    </div>
    <Footer/>
    </>
     );
}

