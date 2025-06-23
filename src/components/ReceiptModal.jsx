// components/ReceiptModal.jsx
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useAuth } from '@/contexts/AuthContext';

const ReceiptModal = ({ open, onClose, receipt }) => {
  const { user } = useAuth();
  if (!receipt) return null;

  // Hitung subtotal dan total diskon
  const subtotal = receipt.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalDiscount = subtotal * 0.15;
  const totalAfterDiscount = subtotal - totalDiscount;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="text-neutral-800">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Pixel Pos</DialogTitle>
          <DialogTitle className="text-center text-xs">Start Your Business</DialogTitle>
          <DialogTitle className="text-sm">Cashier : {user?.displayName || 'Unknown'}</DialogTitle>
          <DialogTitle className="text-sm">Customer : {receipt.customer}</DialogTitle>
          <hr />
        </DialogHeader>

        <p className="text-xs text-gray-500 mb-2">
          ID: {receipt.id} | {receipt.timestamp.toDate().toLocaleString()}
        </p>

        <table className="w-full text-sm mb-2 border rounded-md overflow-hidden">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-2 py-1">Description</th>
              <th className="px-2 py-1">Size</th>
              <th className="px-2 py-1">Qty</th>
              <th className="px-2 py-1 text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            {receipt.items.map((item, idx) => {
              const itemTotal = item.price * item.qty;
              const itemDiscount = itemTotal * 0.15;
              return (
                <React.Fragment key={idx}>
                  <tr className="border-t">
                    <td className="px-2 py-1">{item.name}</td>
                    <td className="px-2 py-1">{item.cupSize}</td>
                    <td className="px-2 py-1">{item.qty}</td>
                    <td className="px-2 py-1 text-right">
                      Rp.{itemTotal.toLocaleString('id-ID')}k
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="px-2 py-1 text-right text-xs text-gray-500 italic">
                      Discount (15%)
                    </td>
                    <td className="px-2 py-1 text-right text-xs text-red-500 italic">
                      -Rp.{itemDiscount.toLocaleString('id-ID')}
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="font-semibold bg-gray-50 border-t">
              <td colSpan="3" className="px-2 py-2 text-right">Subtotal</td>
              <td className="px-2 py-2 text-right">
                Rp.{subtotal.toLocaleString('id-ID')}k
              </td>
            </tr>
            <tr className="text-sm bg-gray-50">
              <td colSpan="3" className="px-2 py-2 text-right text-red-500">Total Discount (15%)</td>
              <td className="px-2 py-2 text-right text-red-500">
                -Rp.{totalDiscount.toLocaleString('id-ID')}
              </td>
            </tr>
            <tr className="font-bold bg-green-50 border-t-2 border-green-200">
              <td colSpan="3" className="px-2 py-2 text-right text-green-700">Total</td>
              <td className="px-2 py-2 text-right text-green-700">
                Rp.{totalAfterDiscount.toLocaleString('id-ID')}k
              </td>
            </tr>
          </tfoot>
        </table>

        <p className="text-xs text-gray-500 mb-2 text-center">
          Terima kasih telah berbelanja di Pixel Pos!
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptModal;
