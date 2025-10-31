import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CustomerService from '../../services/customerManageService';

export const fetchCustomers = createAsyncThunk(
  'customer/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await CustomerService.getAllCustomers();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCustomerDetails = createAsyncThunk(
  'customer/fetchDetails',
  async (userId, { rejectWithValue }) => {
    try {
      const data = await CustomerService.getCustomerDetails(userId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchTransactions = createAsyncThunk(
  'customer/fetchTransactions',
  async (_, { rejectWithValue }) => {
    try {
      const data = await CustomerService.getAllTransactions();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchDevices = createAsyncThunk(
  'customer/fetchDevices',
  async (_, { rejectWithValue }) => {
    try {
      const data = await CustomerService.getAllDevices();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const verifyDevice = createAsyncThunk(
  'customer/verifyDevice',
  async ({ deviceId, status }, { rejectWithValue }) => {
    try {
      const data = await CustomerService.verifyDevice(deviceId, status);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ✅ Slice Definition

const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    customers: [],
    customerDetails: null,
    transactions: [],
    devices: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 📍 Fetch All Customers
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📍 Fetch Customer Details
      .addCase(fetchCustomerDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomerDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.customerDetails = action.payload;
      })
      .addCase(fetchCustomerDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📍 Fetch Transactions
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📍 Fetch Devices
      .addCase(fetchDevices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDevices.fulfilled, (state, action) => {
        state.loading = false;
        state.devices = action.payload;
      })
      .addCase(fetchDevices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📍 Verify Device
      .addCase(verifyDevice.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyDevice.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = 'Device verification updated successfully';
        // Update device status locally
        state.devices = state.devices.map((device) =>
          device.id === action.payload.id ? action.payload : device
        );
      })
      .addCase(verifyDevice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = customerSlice.actions;
export default customerSlice.reducer;
