// frontend/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL, // Replace with your backend API URL
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach token to the headers if available
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle error responses (like unauthorized, etc.)
    if (error.response && error.response.status === 401) {
      // Redirect to login page if the user is unauthorized
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

