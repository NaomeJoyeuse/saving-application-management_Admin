
import DevicesTable from "../components/device_table"

export default function AdminDevices() {
  return (
   
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Device Management</h1>
          <p className="text-slate-600 mt-1">Monitor and manage all registered devices</p>
        </div>

        <DevicesTable />
      </div>
    
  )
}
