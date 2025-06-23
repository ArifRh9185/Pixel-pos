import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import ReceiptModal from '../components/ReceiptModal'
const OrderList = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedReceipt, setSelectedReceipt] = useState(null)

  const filteredOrders = data.filter((receipt) =>
    receipt.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    receipt.customer?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-4">
      <div className="flex items-center shadow-sm border border-neutral-300 px-4 py-2 rounded-xl mb-4">
        <FiSearch className="text-gray-800 mr-2" />
        <input
          type="text"
          placeholder="Search customer..."
          className="w-full focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <h2 className="font-bold text-lg mb-4">Transaction History</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {filteredOrders.map((receipt, index) => (
          <button
            key={receipt.id || index}
            onClick={() => setSelectedReceipt(receipt)}
            className="text-left border p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition"
          >
            <h3 className="font-semibold mb-1">Receipt: {receipt.customer}</h3>
            <p className="text-xs text-gray-500 mb-2">
              ID: {receipt.id} | {receipt.timestamp.toDate().toLocaleString()}
            </p>
            <p className="text-sm text-gray-700">
              Total Items: {receipt.items.length}
            </p>
          </button>
        ))}
      </div>

      <ReceiptModal
        open={!!selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
        receipt={selectedReceipt}
      />
    </div>
  )
}

export default OrderList
