
import CustomersTable from "../components/customer_table"

export default function AdminCustomers() {
  return (
   
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Customer Management</h1>
          <p className="text-slate-600 mt-1">View and manage all customer accounts</p>
        </div>

        <CustomersTable />
      </div>
 
  )
}
