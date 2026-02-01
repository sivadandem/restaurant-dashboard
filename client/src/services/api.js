import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Menu API calls
export const menuAPI = {
  getAll: (params) => api.get('/menu', { params }),
  search: (query) => api.get('/menu/search', { params: { q: query } }),
  getById: (id) => api.get(`/menu/${id}`),
  create: (data) => api.post('/menu', data),
  update: (id, data) => api.put(`/menu/${id}`, data),
  delete: (id) => api.delete(`/menu/${id}`),
  toggleAvailability: (id) => api.patch(`/menu/${id}/availability`),
  clearAll: () => api.delete('/menu/clear/all'),  // Add this
};

// Order API calls
export const orderAPI = {
  getAll: (params) => api.get('/orders', { params }),
  getById: (id) => api.get(`/orders/${id}`),
  create: (data) => api.post('/orders', data),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
  getTopSellers: () => api.get('/orders/analytics/top-sellers'),
  clearAll: () => api.delete('/orders/clear/all'),  // Add this
};

export default api;