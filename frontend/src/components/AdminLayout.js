
// import { useState } from "react"
// import { Menu } from "lucide-react"
// import AdminSidebar from "./AdminSidebar"

// export default function AdminLayout({ children }) {
// const [sidebarOpen, setSidebarOpen] = useState(false)

//   return (
//     <div className="flex h-screen bg-slate-50">
//       <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Top Bar */}
//         <header className="bg-white border-b border-slate-200 px-6 py-4">
//           <div className="flex items-center justify-between">
//             <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-600 hover:text-slate-900">
//               <Menu className="w-6 h-6" />
//             </button>
//             <h1 className="text-xl font-semibold text-slate-900">Admin Dashboard</h1>
//             <div className="flex items-center gap-4">
//               <button className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700">
//                 Logout
//               </button>
//             </div>
//           </div>
//         </header>

//         {/* Main Content */}
//         <main className="flex-1 overflow-y-auto p-6">{children}</main>
//       </div>
//     </div>
//   )
// }

import { useState } from "react"
import { Menu } from "lucide-react"
import { Outlet } from "react-router-dom"  // ✅ Add this import
import AdminSidebar from "./AdminSidebar"

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-slate-50">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-600 hover:text-slate-900">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold text-slate-900">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700">
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
          <Outlet />  {/* ✅ Add this to render nested routes */}
        </main>
      </div>
    </div>
  )
}