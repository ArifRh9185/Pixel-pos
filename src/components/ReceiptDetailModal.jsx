import React from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const ReceiptDetailModal = ({ receipt }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-left font-normal w-full">View Details</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Receipt Details</DialogTitle>
          <DialogDescription>ID: {receipt.id}</DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-2 text-sm">
          <p><strong>Customer:</strong> {receipt.customer}</p>
          <p><strong>Date:</strong> {receipt.timestamp?.toDate?.().toLocaleString() || '-'}</p>
          <p><strong>Payment Method:</strong> {receipt.paymentMethod === 'QRIS' ? 'QRIS' : 'Cash'}</p>
          <div>
            <strong>Items:</strong>
            <ul className="list-disc list-inside">
              {receipt.items?.map((item, index) => (
                <li key={index}>
                  {item.name || item.title} × {item.qty} ({item.cupSize}, {item.sugarLevel}, {item.iceLevel})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ReceiptDetailModal
