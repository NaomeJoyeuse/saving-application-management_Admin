import TransactionsTable from "../components/transaction_table"

export default function AdminTransactions() {
  return (

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Transaction History</h1>
          <p className="text-slate-600 mt-1">Monitor all deposits and withdrawals</p>
        </div>

        <TransactionsTable />
      </div>
   
  )
}
