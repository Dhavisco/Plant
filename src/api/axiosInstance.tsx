// src/api/axiosInstance.ts
import axios from 'axios';

// Base URL from environment variables
const API_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY, // Include the API key globally
  },
});

// Request Interceptor (Optional, but useful for logging)
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Request:', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor (Optional, for global error handling)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
