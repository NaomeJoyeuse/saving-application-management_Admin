
import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api`,
  
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   
      console.log('Authorization Header:', config.headers.Authorization);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized, redirecting to login...');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('admin');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
