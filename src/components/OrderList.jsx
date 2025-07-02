import { DataTable } from './DataTable'
import { useAuth } from '@/contexts/AuthContext'
import { ClipLoader } from "react-spinners"

function OrderList({ data }) {
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <ClipLoader
          color="#00a63e"
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    )
  }

  return (
    <div className="w-full h-full p-4">
      <h1 className="text-xl font-bold ">Order List</h1>
      <DataTable data={data} />
    </div>
  )
}

export default OrderList
