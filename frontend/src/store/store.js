import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import customerReducer from './slices/customerManageSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
  },
});

export default store; // ✅ default export
