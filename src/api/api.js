import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/v1`,
});

// interceptor de solicitud
api.interceptors.request.use(
  config => {
      // Obtiene el token de localStorage
      const tokenData = JSON.parse(localStorage.getItem('token'));
      if (tokenData && tokenData.access_token) {
          config.headers['Authorization'] = `Bearer ${tokenData.access_token}`;
      }
      return config;
  },
  error => {
      return Promise.reject(error);
  }
);

export default api;