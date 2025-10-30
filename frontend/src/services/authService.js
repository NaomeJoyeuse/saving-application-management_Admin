// src/services/authService.js
import axiosInstance from './axiosInstance';

const AuthService = {
  loginAdmin: async ({ email, password }) => {
    try {
      const response = await axiosInstance.post('/admin/login', { email, password });
      return response.data; // contains token and maybe user info
    } catch (error) {
      throw error.response?.data?.message || 'Login failed';
    }
  },
  logoutAdmin: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('admin');
  },
};

export default AuthService;
