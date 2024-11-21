// import axios from 'axios';

// const API_URL = import.meta.env.VITE_BASE_URL; // Assumes you're using Vite for env variables

// // Create an Axios instance
//  const axiosInstance = axios.create({
//   baseURL: API_URL, // Base URL for your API
//   headers: {
//     'Content-Type': 'application/json', // Default headers
//   },
// });

// axiosInstance.interceptors.request.use(
//   config => {
//     config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
//         return config;
//     },
//     error => {
//         return Promise.reject(error);

//     });

// export default axiosInstance;