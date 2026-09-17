import axios from 'axios';

// Get base URL from environment or default to local backend
const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, '');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach JWT token to Authorization header if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
