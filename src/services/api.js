import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Only attach JWT token if present in storage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token expiration globally
api.interceptors.response.use(
  (response) => response, // Pass successful responses through
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      console.error("Session expired. Redirecting to login.");
      localStorage.removeItem("access_token"); // Clear the token
      window.location.href = "/login"; // Redirect to login
    }
    return Promise.reject(error); // Reject other errors as usual
  }
);

// API calls
export const registerUser = (data) => api.post('/register/', data);  // No token needed
export const loginUser = (data) => api.post('/login/', data);        // No token needed

// Authenticated calls
export const getUserProfile = () => api.get('/user-profile/');
export const fetchCourseProgress = (courseId) => api.get(`/course-progress/${courseId}/`);

export const fetchCourses = () => api.get('/courses/');
export const requestPasswordReset = (email) => api.post('/password-reset-request/', { email });
export const resetPassword = (uid, token, newPassword) =>
  api.post(`/reset-password-confirm/?uid=${uid}&token=${token}`, { new_password: newPassword });

export const fetchCourseById = (courseId) => api.get(`/courses/${courseId}/`);
export const fetchLearningPathDetail = (learningpathId) => api.get(`/learning-paths/${learningpathId}`);
export const fetchModuleDetail = (moduleName) => api.get(`/module-by-name/${moduleName}/`);
export const getCourseProgress = (courseId) => api.get(`/course-progress/${courseId}`);
// export const updateQuizScore = (quizId, userAnswers) =>
//   api.post(`/quizzes/${quizId}/progress/`, { answers: userAnswers });

// Fetch Learning Path Progress
export const fetchLearningPathProgress = (learningPathId) =>
  api.get(`/learning-path-progress/${learningPathId}/`);

// Fetch Module Progress
export const fetchModuleProgress = async (learningPathId) => {
  try {
    const response = await api.get(`/module-progress?learning_path=${learningPathId}`);
    console.log("Raw Module Progress Response:", response.data);
    return response.data; // Expecting this to be an array
  } catch (error) {
    console.error("Error fetching module progress:", error);
    throw error;
  }
};



// Update Module Progress after video or quiz
export const updateModuleProgress = async (moduleId, data = {}) => {
  try {
    const response = await api.patch(`/module-progress/${moduleId}/update-progress/`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating module progress:", error);
    throw error;
  }
};

export const fetchAllModulesProgress = async (learningPathId) => {
  const response = await axios.get(`/api/v1/module-progress/?learning_path=${learningPathId}`);
  console.log("Modules Progress Response:", response.data); // Debug response
  return response.data; // Ensure this returns the correct data format
};

//For a different use case
export const fetchAllModulesProgress2 = async () => {
  const response = await api.get('/module-progress/'); 
  console.log("Modules Progress Response:", response.data);
  return response.data;
};

// Update Quiz Progress
export const updateQuizScore = async (quizId, answers) => {
  try {
    const response = await api.post(`/quizzes/${quizId}/submit/`, { answers });
    return response.data; // Ensure only data is returned
  } catch (error) {
    console.error("Error in updateQuizScore:", error);
    throw error;
  }
};


export const fetchNextLearningPath = async (currentLearningPathId) => {
  try {
    const response = await api.get(`/next-learning-path/${currentLearningPathId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching next learning path:", error);
    throw error;
  }
};


export default api;
