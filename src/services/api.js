import axios from 'axios';

// Get base URL: In Next.js, default to relative '/api' which works on any Vercel domain without CORS!
const envUrl = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_BASE_URL)
  ? process.env.NEXT_PUBLIC_API_BASE_URL
  : (typeof window !== 'undefined' ? '/api' : 'http://localhost:3000/api');

export const API_BASE_URL = envUrl.replace(/\/+$/, '');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach JWT token to Authorization header if present
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
