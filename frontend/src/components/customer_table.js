
"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../store/slices/customerManageSlice";
import { Search, Eye, Ban, CheckCircle } from "lucide-react";

export default function CustomersTable() {
  const dispatch = useDispatch();
  const { customers, loading, error } = useSelector((state) => state.customer);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const filteredCustomers = customers?.filter((customer) => {
    const matchesSearch =
      customer.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.Account?.accountNumber?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const styles = {
      active: "bg-emerald-100 text-emerald-700",
      pending: "bg-amber-100 text-amber-700",
      suspended: "bg-red-100 text-red-700",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          styles[status] || "bg-slate-100 text-slate-600"
        }`}
      >
        {status?.charAt(0).toUpperCase() + status?.slice(1) || "N/A"}
      </span>
    );
  };

  const getDeviceStatusBadge = (status) => {
    const styles = {
      verified: "bg-emerald-100 text-emerald-700",
      pending: "bg-amber-100 text-amber-700",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          styles[status] || "bg-slate-100 text-slate-600"
        }`}
      >
        {status?.charAt(0).toUpperCase() + status?.slice(1) || "N/A"}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-xl font-semibold text-slate-900">All Customers</h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full sm:w-64"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <p className="p-6 text-center text-slate-600">Loading customers...</p>
        ) : error ? (
          <p className="p-6 text-center text-red-600">Error: {error}</p>
        ) : filteredCustomers?.length === 0 ? (
          <p className="p-6 text-center text-slate-500">No customers found.</p>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Full Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Account Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Balance</th>

                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">{customer.fullName}</td>
                  <td className="px-6 py-4">{customer.email}</td>
                  <td className="px-6 py-4">{customer.Account?.accountNumber}</td>
                  <td className="px-6 py-4 font-semibold">RWF {Number(customer.Account?.balance || 0).toLocaleString()}</td>
                 
                  {/* <td className="px-6 py-4">{getDeviceStatusBadge(customer.deviceStatus || "verified")}</td> */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                        onClick={() => setSelectedCustomer(customer)}
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {customer.status === "pending" && (
                        <button
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                          title="Approve"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      {customer.status === "active" && (
                        <button
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Suspend"
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Customer Details</h3>
            <button
              className="absolute top-3 right-3 text-red-600 hover:text-red-800 font-bold text-lg"
              onClick={() => setSelectedCustomer(null)}
            >
              ×
            </button>
            <div className="space-y-2 text-sm">
              <p><strong>Full Name:</strong> {selectedCustomer.fullName}</p>
              <p><strong>Email:</strong> {selectedCustomer.email}</p>
              <p><strong>Account Number:</strong> {selectedCustomer.Account?.accountNumber}</p>
              <p><strong>Current Balance:</strong> RWF {Number(selectedCustomer.Account?.balance || 0).toLocaleString()}</p>
              <p><strong>Status:</strong> {selectedCustomer.status}</p>
              <p><strong>Created At:</strong> {new Date(selectedCustomer.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
