import axios from 'axios';

// Configure axios defaults so existing imports of axios pick this up
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
axios.defaults.withCredentials = true;

// Attach Authorization header from localStorage if available
axios.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    // ignore localStorage read errors in some environments
    console.warn('axios request interceptor error', error);
  }
  return config;
}, (error) => Promise.reject(error));

// Global response interceptor to handle 401s
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      // Clear any stored session and redirect to the appropriate login
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
      } catch (error) {
        console.warn('Failed clearing localStorage after 401', error);
      }

      const path = window.location.pathname || '';
      if (path.startsWith('/captain')) {
        window.location.href = '/captain-login';
      } else {
        window.location.href = '/user-login';
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
