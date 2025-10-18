import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',       // leci przez Vite proxy na http://localhost:8000
  withCredentials: true  // jeśli auth używa cookies/sesji
});

// ZGODNE z Twoim routerem: /signup, /signin, /signout
export const AuthAPI = {
  signup: (payload) => api.post('/auth/signup', payload),
  signin: (payload) => api.post('/auth/signin', payload),
  signout: () => api.post('/auth/signout')
};

// Ping do testu połączenia front <-> back
export const health = () => api.get('/health');
