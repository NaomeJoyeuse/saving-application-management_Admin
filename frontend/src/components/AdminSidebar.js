
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Smartphone, ArrowLeftRight, X } from "lucide-react";
import { useSelector } from "react-redux";

export default function AdminSidebar({ isOpen, onClose }) {
  const location = useLocation();

  const { user } = useSelector((state) => state.auth); 

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Users, label: "Customers", path: "/dashboard/customers" },
    { icon: Smartphone, label: "Devices", path: "/dashboard/devices" },
    { icon: ArrowLeftRight, label: "Transactions", path: "/dashboard/transactions" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

     
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-slate-900 text-white z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-emerald-400">Savings Management System</h2>
            <p className="text-xs text-slate-400">Admin Portal</p>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-colors duration-200
                  ${active ? "bg-emerald-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"}
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center">
              <span className="text-sm font-bold">{user?.fullName?.charAt(0) || "A"}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{user?.fullName || "Admin User"}</p>
              <p className="text-xs text-slate-400">{user?.email || "admin@example.com"}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
