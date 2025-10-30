
import axiosInstance from './axiosInstance';

const CustomerService = {
  getAllCustomers: async () => {
    try {
      const response = await axiosInstance.get('/admin/customers');
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch customers';
    }
  },

  getCustomerDetails: async (userId) => {
    try {
      const response = await axiosInstance.get(`/admin/customers/${userId}`);
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch customer details';
    }
  },

  getAllTransactions: async () => {
    try {
      const response = await axiosInstance.get('/admin/transactions');
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch transactions';
    }
  },

  getAllDevices: async () => {
    try {
      const response = await axiosInstance.get('/admin/devices');
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch devices';
    }
  },

  verifyDevice: async (deviceId, status) => {
    try {
      const response = await axiosInstance.patch(`/admin/device/verify`, { deviceId, status });
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update device status';
    }
  },
};

export default CustomerService;
