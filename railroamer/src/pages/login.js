//frontend/pages/login.js
import { useState } from 'react';
import api from '../utils/api';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import styles from '../../public/StyleSheet/Login.module.css';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login';
      const { data } = await api.post(endpoint, form);
      localStorage.setItem('token', data.token);
      router.push('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <h2 className={styles.title}>{isRegister ? 'Register' : 'Login'}</h2>
          <form onSubmit={handleSubmit}>
            {isRegister && (
              <input
                type="text"
                placeholder="Name"
                className={styles.input}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              className={styles.input}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className={styles.input}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button className={styles.button}>
              {isRegister ? 'Register' : 'Login'}
            </button>
          </form>
          <p className={styles.toggleText}>
            {isRegister ? 'Already have an account?' : 'No account yet?'}{' '}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className={styles.toggleLink}
            >
              {isRegister ? 'Login' : 'Register'}
            </button>
          </p>
        </div>
      </div>
    </>
  );
}