import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
});

export const setAuthToken = (token) => {
  if (token) API.defaults.headers.common['x-auth-token'] = token;
  else delete API.defaults.headers.common['x-auth-token'];
};

export const register = async (userData) => {
  const res = await API.post('/auth/register', userData);
  return res.data;
};

export const login = async (creds) => {
  const res = await API.post('/auth/login', creds);
  return res.data;
};

export const getMe = async (token) => {
  if (!token) throw new Error('No token');
  setAuthToken(token);
  const res = await API.get('/auth/me');
  return res.data;
};

export const fetchRecipes = async (q) => {
  const res = await API.get('/recipes' + (q ? `?q=${encodeURIComponent(q)}` : ''));
  return res.data;
};

export const fetchRecipe = async (id) => {
  const res = await API.get(`/recipes/${id}`);
  return res.data;
};

export const createRecipe = async (data) => {
  const res = await API.post('/recipes', data);
  return res.data;
};

export const updateRecipe = async (id, data) => {
  const res = await API.put(`/recipes/${id}`, data);
  return res.data;
};
export const deleteRecipe = async (id) => {
  const token = localStorage.getItem('token');
  if (token) API.defaults.headers.common['x-auth-token'] = token;
  const res = await API.delete(`/recipes/${id}`);
  return res.data;
};

export const toggleFavorite = async (id) => {
  const res = await API.post(`/recipes/${id}/toggle-favorite`);
  return res.data;
};
