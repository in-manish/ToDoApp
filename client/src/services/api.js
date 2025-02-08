import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const todoApi = {
  getAll: () => api.get('/api/todos'),
  create: (text) => api.post('/api/todos', { text, completed: false }),
  update: (id, data) => api.put(`/api/todos/${id}`, data),
  delete: (id) => api.delete(`/api/todos/${id}`),
};

export const authApi = {
  login: (credentials) => api.post('/api/login', credentials),
  signup: (userData) => api.post('/api/signup', userData),
};

export default api; 