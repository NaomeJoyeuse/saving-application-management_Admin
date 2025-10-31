import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './components/AdminLayout.js';
import CustomerManagePage from './pages/AllCustomer.js';
import Overview from './pages/adminDashboard.js';
import Devices from './pages/Devices';
import Transactions from './pages/transactions';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}

         <Route path="/dashboard" element={<AdminDashboard />}>
          <Route index element={<Overview />} />
          <Route path="overview" element={< Overview />} />
          <Route path="customers" element={<CustomerManagePage />} />
          <Route path="devices" element={<Devices />} />
          <Route path="transactions" element={<Transactions />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
