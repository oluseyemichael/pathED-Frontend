import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach JWT token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (data) => api.post('/register/', data);
export const loginUser = (data) => api.post('/login/', data);
export const verifyEmail = (uid, token) =>
  api.get(`/verify-email/?uid=${uid}&token=${token}`);

export const getUserProfile = () => api.get('/auth/user/');  // Endpoint for user info

//function to get course progress dynamically
export const fetchCourseProgress = (userId) => api.get(`/course-progress/?user=${userId}`);
export const fetchCourses = () => api.get('/courses/');
export const requestPasswordReset = (email) => api.post('/password-reset-request/', { email });

export default api;