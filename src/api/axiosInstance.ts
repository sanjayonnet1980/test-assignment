import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // JSON Server or real API
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    // Add auth token or custom headers here
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // Global error handling
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;