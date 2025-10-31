"use client";

import StatsCard from "../components/StatsCard";
import { Users, ArrowLeftRight, Wallet, Clock } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers, fetchDevices, fetchTransactions } from "../store/slices/customerManageSlice";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { customers, devices, transactions, loading } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchDevices());
    dispatch(fetchTransactions());
  }, [dispatch]);

  
  const totalCustomers = customers?.length || 0;
  const pendingVerifications = devices?.filter(d => d.isVerified === false)?.length || 0;
  const totalTransactions = transactions?.length || 0;
  const totalBalance = customers?.reduce((sum, c) => sum + Number(c.Account?.balance || 0), 0) || 0;
  const verifiedDevices = devices?.filter(d => d.isVerified === true)?.length || 0;

  const recentTransactions = [...transactions].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  const today = new Date().toDateString();
  const newRegistrations = customers?.filter(c => new Date(c.createdAt).toDateString() === today).length || 0;

  return (
    
      <div className="space-y-6">
      
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-600 mt-1">Monitor your savings management system</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Customers"
            value={totalCustomers}
            icon={Users}
            trend="up"
            trendValue={`${newRegistrations} today`}
            color="emerald"
          />
          <StatsCard
            title="Pending Verifications"
            value={pendingVerifications}
            icon={Clock}
            trend={pendingVerifications > 0 ? "down" : "up"}
            trendValue={`${pendingVerifications} devices awaiting approval`}
            color="amber"
          />
          <StatsCard
            title="Total Transactions"
            value={totalTransactions}
            icon={ArrowLeftRight}
            trend="up"
            trendValue={`Latest ${recentTransactions.length}`}
            color="blue"
          />
          <StatsCard
            title="Total Balance"
            value={`RWF ${totalBalance.toLocaleString()}`}
            icon={Wallet}
            trend="up"
            trendValue="+ based on customer balances"
            color="emerald"
          />
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Transactions</h3>
            <div className="space-y-4">
              {recentTransactions.map((txn, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${txn.type === "deposit" ? "bg-emerald-100" : "bg-red-100"}`}>
                      {txn.type === "deposit" ? "↓" : "↑"}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{txn.customerName}</p>
                      <p className="text-sm text-slate-500">{new Date(txn.createdAt).toLocaleTimeString()}</p>
                    </div>
                  </div>
                  <p className={`font-semibold ${txn.type === "deposit" ? "text-emerald-600" : "text-red-600"}`}>
                    {txn.type === "deposit" ? "+" : "-"}RWF {Number(txn.amount).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Actions */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Pending Actions</h3>
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start justify-between">
                <div>
                  <p className="font-medium text-amber-900">Device Verifications</p>
                  <p className="text-sm text-amber-700 mt-1">{pendingVerifications} devices awaiting approval</p>
                </div>
                <button className="px-3 py-1 bg-amber-600 text-white rounded text-sm hover:bg-amber-700">Review</button>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start justify-between">
                <div>
                  <p className="font-medium text-blue-900">New Registrations</p>
                  <p className="text-sm text-blue-700 mt-1">{newRegistrations} new customers today</p>
                </div>
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">View</button>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start justify-between">
                <div>
                  <p className="font-medium text-emerald-900">System Status</p>
                  <p className="text-sm text-emerald-700 mt-1">All systems operational</p>
                </div>
                <span className="px-3 py-1 bg-emerald-600 text-white rounded text-sm">Healthy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Today's Activity</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-slate-600">New Customers</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{newRegistrations}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Deposits</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">
                RWF {recentTransactions.filter(t => t.type === "deposit").reduce((sum, t) => sum + Number(t.amount), 0).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Withdrawals</p>
              <p className="text-2xl font-bold text-red-600 mt-1">
                RWF {recentTransactions.filter(t => t.type === "withdraw").reduce((sum, t) => sum + Number(t.amount), 0).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Active Users</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{verifiedDevices}</p>
            </div>
          </div>
        </div>
      </div>
  
  );
}
