// "use client";

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDevices, verifyDevice } from "../store/slices/customerManageSlice";
// import { Search, Smartphone, CheckCircle, XCircle } from "lucide-react";

// export default function DevicesTable() {
//   const dispatch = useDispatch();
//   const { devices, loading, error } = useSelector((state) => state.customer);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");

//   useEffect(() => {
//     dispatch(fetchDevices());
//   }, [dispatch]);

//   const handleVerify = (deviceId, status) => {
//     dispatch(verifyDevice({ deviceId, status }));
//   };

//   // Map isVerified to status string
//   const getDeviceStatus = (isVerified) =>
//     isVerified === true ? "verified" : isVerified === false ? "pending" : "rejected";

//   const filteredDevices = devices.filter((device) => {
//     const matchesSearch =
//       device.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       device.deviceId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       device.customerId?.toLowerCase().includes(searchTerm.toLowerCase());

//     const deviceStatus = getDeviceStatus(device.isVerified);

//     const matchesStatus = statusFilter === "all" || deviceStatus === statusFilter;

//     return matchesSearch && matchesStatus;
//   });

//   const getStatusBadge = (isVerified) => {
//     const status = getDeviceStatus(isVerified);
//     const styles = {
//       verified: "bg-emerald-100 text-emerald-700",
//       pending: "bg-amber-100 text-amber-700",
//       rejected: "bg-red-100 text-red-700",
//     };

//     return (
//       <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
//         {status.charAt(0).toUpperCase() + status.slice(1)}
//       </span>
//     );
//   };

//   if (loading) {
//     return <div className="p-6 text-slate-600">Loading devices...</div>;
//   }

//   if (error) {
//     return <div className="p-6 text-red-600">Error: {error}</div>;
//   }

//   return (
//     <div className="bg-white rounded-lg border border-slate-200">
//       {/* Header */}
//       <div className="p-6 border-b border-slate-200">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <h2 className="text-xl font-semibold text-slate-900">All Devices</h2>

//           <div className="flex flex-col sm:flex-row gap-3">
//             {/* Search */}
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search devices..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full sm:w-64"
//               />
//             </div>

//             {/* Status Filter */}
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
//             >
//               <option value="all">All Status</option>
//               <option value="verified">Verified</option>
//               <option value="pending">Pending</option>
//               <option value="rejected">Rejected</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-slate-50 border-b border-slate-200">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
//                 Device ID
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
//                 Customer
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
//                 Device Type
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
//                 IP Address
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
//                 Registered
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-200">
//             {filteredDevices.map((device) => {
//               const status = getDeviceStatus(device.isVerified);
//               return (
//                 <tr key={device.deviceId} className="hover:bg-slate-50">
//                   <td className="px-6 py-4 flex items-center gap-2">
//                     <Smartphone className="w-4 h-4 text-slate-400" />
//                     <span className="font-mono text-sm text-slate-900">{device.deviceId}</span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <p className="font-medium text-slate-900">{device.customer}</p>
//                     <p className="text-sm text-slate-500">{device.customerId}</p>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-slate-900">{device.deviceType}</td>
//                   <td className="px-6 py-4 text-sm font-mono text-slate-600">{device.ipAddress}</td>
//                   <td className="px-6 py-4">{getStatusBadge(device.isVerified)}</td>
//                   <td className="px-6 py-4 text-sm text-slate-600">{device.registeredDate}</td>
//                   <td className="px-6 py-4">
//                     {device.isVerified === false && (
//                       <div className="flex items-center gap-2">
//                         <button
//                           className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"
//                           title="Approve"
//                           onClick={() => handleVerify(device.deviceId, true)}
//                         >
//                           <CheckCircle className="w-4 h-4" />
//                         </button>
//                         <button
//                           className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
//                           title="Reject"
//                           onClick={() => handleVerify(device.deviceId, null)}
//                         >
//                           <XCircle className="w-4 h-4" />
//                         </button>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* Footer */}
//       <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
//         <p className="text-sm text-slate-600">
//           Showing {filteredDevices.length} of {devices.length} devices
//         </p>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDevices, verifyDevice } from "../store/slices/customerManageSlice";
import { Search, Smartphone, CheckCircle, XCircle } from "lucide-react";

export default function DevicesTable() {
  const dispatch = useDispatch();
  const { devices, loading, error } = useSelector((state) => state.customer);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchDevices());
  }, [dispatch]);

  const handleVerify = (deviceId, status) => {
    dispatch(verifyDevice({ deviceId, status }));
  };

  // Map isVerified to status string
  const getDeviceStatus = (isVerified) =>
    isVerified === true ? "verified" : isVerified === false ? "pending" : "rejected";

  const filteredDevices = devices?.filter((device) => {
    const matchesSearch =
      device.User?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.User?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.deviceId?.toLowerCase().includes(searchTerm.toLowerCase());

    const deviceStatus = getDeviceStatus(device.isVerified);

    const matchesStatus = statusFilter === "all" || deviceStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (isVerified) => {
    const status = getDeviceStatus(isVerified);
    const styles = {
      verified: "bg-emerald-100 text-emerald-700",
      pending: "bg-amber-100 text-amber-700",
      rejected: "bg-red-100 text-red-700",
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return <div className="p-6 text-slate-600">Loading devices...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-xl font-semibold text-slate-900">All Devices</h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search devices..."
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
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Device ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">User Full Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Registered</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredDevices.map((device) => {
              const status = getDeviceStatus(device.isVerified);
              return (
                <tr key={device.deviceId} className="hover:bg-slate-50">
                  <td className="px-6 py-4 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-slate-400" />
                    <span className="font-mono text-sm text-slate-900">{device.deviceId}</span>
                  </td>
                  <td className="px-6 py-4">{device.User?.fullName}</td>
                  <td className="px-6 py-4">{device.User?.email}</td>
                  <td className="px-6 py-4">{getStatusBadge(device.isVerified)}</td>
                  <td className="px-6 py-4">{new Date(device.createdAt).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    {device.isVerified === false && (
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                          title="Verify Device"
                          onClick={() => handleVerify(device.deviceId, true)}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Reject Device"
                          onClick={() => handleVerify(device.deviceId, null)}
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Showing {filteredDevices.length} of {devices.length} devices
        </p>
      </div>
    </div>
  );
}
