
// "use client";

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTransactions } from "../store/slices/customerManageSlice";
// import { Search, ArrowUpCircle, ArrowDownCircle, Eye } from "lucide-react";

// export default function TransactionsTable() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [typeFilter, setTypeFilter] = useState("all");
//   const [selectedTransaction, setSelectedTransaction] = useState(null);

//   const dispatch = useDispatch();
//   const { transactions, loading, error } = useSelector((state) => state.customer);

//   useEffect(() => {
//     dispatch(fetchTransactions());
//   }, [dispatch]);

//   const filteredTransactions = transactions.filter((transaction) => {
//     const customerName = transaction.Account?.User?.fullName || "";
//     const matchesSearch =
//       customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       transaction.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       transaction.Account?.accountNumber?.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesType = typeFilter === "all" || transaction.type.toLowerCase() === typeFilter;

//     return matchesSearch && matchesType;
//   });

//   const getTypeIcon = (type) =>
//     type.toLowerCase() === "deposit" ? (
//       <ArrowDownCircle className="w-5 h-5 text-emerald-600" />
//     ) : (
//       <ArrowUpCircle className="w-5 h-5 text-red-600" />
//     );

//   const getTypeBadge = (type) => {
//     const styles = {
//       deposit: "bg-emerald-100 text-emerald-700",
//       withdraw: "bg-red-100 text-red-700",
//       withdraw: "bg-red-100 text-red-700",
//       withdraw: "bg-red-100 text-red-700",
//     };
//     return (
//       <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[type.toLowerCase()]}`}>
//         {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
//       </span>
//     );
//   };

//   return (
//     <div className="bg-white rounded-lg border border-slate-200">
//       {/* Header */}
//       <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <h2 className="text-xl font-semibold text-slate-900">Transaction History</h2>

//         <div className="flex flex-col sm:flex-row gap-3">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search transactions..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full sm:w-64"
//             />
//           </div>

//           <select
//             value={typeFilter}
//             onChange={(e) => setTypeFilter(e.target.value)}
//             className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
//           >
//             <option value="all">All Types</option>
//             <option value="deposit">Deposits</option>
//             <option value="withdraw">Withdrawals</option>
//           </select>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-slate-50 border-b border-slate-200">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Transaction</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Customer</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Type</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Amount</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Action</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-200">
//             {filteredTransactions.map((txn) => (
//               <tr key={txn.id} className="hover:bg-slate-50">
//                 <td className="px-6 py-4 flex items-center gap-2">
//                   {getTypeIcon(txn.type)}
//                   <span className="font-mono text-sm text-slate-900">{txn.id}</span>
//                 </td>
//                 <td className="px-6 py-4">
//                   <p className="font-medium text-slate-900">{txn.Account?.User?.fullName}</p>
//                   <p className="text-sm text-slate-500">{txn.Account?.accountNumber}</p>
//                 </td>
//                 <td className="px-6 py-4">{getTypeBadge(txn.type)}</td>
//                 <td className="px-6 py-4 font-semibold text-slate-900">RWF {Number(txn.amount).toLocaleString()}</td>
//                 <td className="px-6 py-4 text-sm text-slate-600">{new Date(txn.createdAt).toLocaleString()}</td>
//                 <td className="px-6 py-4">
//                   <button
//                     className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
//                     onClick={() => setSelectedTransaction(txn)}
//                   >
//                     <Eye className="w-4 h-4" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Footer */}
//       <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
//         <p className="text-sm text-slate-600">
//           Showing {filteredTransactions.length} of {transactions.length} transactions
//         </p>
//       </div>

//       {/* Modal */}
//       {selectedTransaction && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
//             <h3 className="text-lg font-semibold text-slate-900 mb-4">Transaction Details</h3>

//             <button
//               className="absolute top-3 right-3 text-red-600 hover:text-red-800 font-bold text-lg"
//               onClick={() => setSelectedTransaction(null)}
//             >
//               ×
//             </button>

//             <div className="space-y-2">
//               <p><strong>ID:</strong> {selectedTransaction.id}</p>
//               <p><strong>Type:</strong> {selectedTransaction.type}</p>
//               <p><strong>Amount:</strong> RWF {Number(selectedTransaction.amount).toLocaleString()}</p>
//               <p><strong>Balance Before:</strong> RWF {Number(selectedTransaction.balanceBefore).toLocaleString()}</p>
//               <p><strong>Balance After:</strong> RWF {Number(selectedTransaction.balanceAfter).toLocaleString()}</p>
//               <p><strong>Description:</strong> {selectedTransaction.description}</p>
//               <p><strong>Date:</strong> {new Date(selectedTransaction.createdAt).toLocaleString()}</p>
//               <p><strong>Account Number:</strong> {selectedTransaction.Account?.accountNumber}</p>
//               <p><strong>Customer Name:</strong> {selectedTransaction.Account?.User?.fullName}</p>
//               <p><strong>Email:</strong> {selectedTransaction.Account?.User?.email}</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../store/slices/customerManageSlice";
import { Search, ArrowUpCircle, ArrowDownCircle, Eye } from "lucide-react";

export default function TransactionsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const filteredTransactions = transactions.filter((transaction) => {
    const customerName = transaction.Account?.User?.fullName || "";
    const matchesSearch =
      customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.Account?.accountNumber?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === "all" || transaction.type.toLowerCase() === typeFilter;

    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type) =>
    type.toLowerCase() === "deposit" ? (
      <ArrowDownCircle className="w-5 h-5 text-emerald-600" />
    ) : (
      <ArrowUpCircle className="w-5 h-5 text-red-600" />
    );

  const getTypeBadge = (type) => {
    const styles = {
      deposit: "bg-emerald-100 text-emerald-700",
      withdraw: "bg-red-100 text-red-700",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[type.toLowerCase()]}`}>
        {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-xl font-semibold text-slate-900">Transaction History</h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full sm:w-64"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Types</option>
            <option value="deposit">Deposits</option>
            <option value="withdraw">Withdrawals</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredTransactions.map((txn, index) => (
              <tr key={txn.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">{index + 1}</td>
                <td className="px-6 py-4">
                  <p className="font-medium text-slate-900">{txn.Account?.User?.fullName}</p>
                  <p className="text-sm text-slate-500">{txn.Account?.accountNumber}</p>
                </td>
                <td className="px-6 py-4">{getTypeBadge(txn.type)}</td>
                <td className="px-6 py-4 font-semibold text-slate-900">RWF {Number(txn.amount).toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{new Date(txn.createdAt).toLocaleString()}</td>
                <td className="px-6 py-4">
                  <button
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    onClick={() => setSelectedTransaction(txn)}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Showing {filteredTransactions.length} of {transactions.length} transactions
        </p>
      </div>

      {/* Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Transaction Details</h3>

            <button
              className="absolute top-3 right-3 text-red-600 hover:text-red-800 font-bold text-lg"
              onClick={() => setSelectedTransaction(null)}
            >
              ×
            </button>

            <div className="space-y-2">
              <p><strong>ID:</strong> {selectedTransaction.id}</p>
              <p><strong>Type:</strong> {selectedTransaction.type}</p>
              <p><strong>Amount:</strong> RWF {Number(selectedTransaction.amount).toLocaleString()}</p>
              <p><strong>Balance Before:</strong> RWF {Number(selectedTransaction.balanceBefore).toLocaleString()}</p>
              <p><strong>Balance After:</strong> RWF {Number(selectedTransaction.balanceAfter).toLocaleString()}</p>
              <p><strong>Description:</strong> {selectedTransaction.description}</p>
              <p><strong>Date:</strong> {new Date(selectedTransaction.createdAt).toLocaleString()}</p>
              <p><strong>Account Number:</strong> {selectedTransaction.Account?.accountNumber}</p>
              <p><strong>Customer Name:</strong> {selectedTransaction.Account?.User?.fullName}</p>
              <p><strong>Email:</strong> {selectedTransaction.Account?.User?.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
