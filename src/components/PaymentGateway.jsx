import { useAuth } from '@/contexts/AuthContext';
import { ClipLoader } from 'react-spinners';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

function PaymentGateway({ cart, setPage, onProcess }) {
  const { loading, user } = useAuth();

  const subtotal = cart.reduce((sum, item) => {
    const itemPrice = Number(item.price) || 0;
    return sum + itemPrice * item.qty;
  }, 0);

  function parseRupiah(str) {
    const clean = str.replace(/\./g, '').replace(',', '.');
    return parseFloat(clean) || 0;
  }

  const customerName = localStorage.getItem('customerName') || '';
  const discount = subtotal * 0.15;
  const tax = (subtotal - discount) * 0.1;
  const total = subtotal - discount + tax;

  const [cash, setCash] = useState('');
  const cashParsed = parseRupiah(cash);
  const change = cashParsed - total;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <ClipLoader color="#00a63e" size={50} />
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <div className="p-2 border bg-neutral-100/50 rounded-3xl">
        <div className="flex justify-between items-center">
          <p className="font-semibold p-2 text-xl text-neutral-800">Payment Details</p>
          <button
            className="bg-green-600 text-sm text-white px-4 py-2 rounded-2xl font-semibold hover:bg-green-700 transition-colors"
            onClick={() => setPage('products')}
          >
            Back
          </button>
        </div>
        <div className="text-sm space-y-2 p-2">
          <p className="font-semibold text-neutral-600">Cashier: {user.displayName || 'Guest'}</p>
          <p className="font-semibold text-neutral-600">Date: {new Date().toLocaleDateString()}</p>
          <p className="font-semibold text-neutral-600">Customer: {customerName}</p>
        </div>

        <div className="border pt-1 px-4 rounded-2xl shadow-sm bg-white">
          {cart.map((item, index) => {
            const itemPrice = Number(item.price) || 0;
            return (
              <div key={index} className="border-neutral-200 w-max-md">
                <div className="flex justify-between items-start pt-2">
                  <div>
                    <h3 className="font-semibold text-neutral-700 text-sm">{item.name}</h3>
                    <div className="text-xs text-gray-500 mt-1 space-y-1">
                      <p>Cup Size: {item.cupSize}</p>
                      <p>Ice Level: {item.iceLevel}</p>
                      <p>Sugar Level: {item.sugarLevel}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-sm text-green-600">
                    Rp.{(itemPrice * item.qty).toLocaleString('id-ID')}
                  </p>
                </div>
                <hr className="mt-2" />
              </div>
            );
          })}
        </div>

        <div className="text-sm space-y-2 p-2 pt-4">
          <div className="flex justify-between">
            <span className="text-gray-500">Item</span>
            <span className="text-neutral-700 font-semibold">{cart.length} Items</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal</span>
            <span className="text-neutral-700 font-semibold">
              Rp.{subtotal.toLocaleString('id-ID')}
            </span>
          </div>
          <div className="flex justify-between text-green-600">
            <span className="text-gray-500">Discount (15%)</span>
            <span className="font-semibold">-Rp.{discount.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Tax (10%)</span>
            <span className="text-neutral-700 font-semibold">Rp.{tax.toLocaleString('id-ID')}</span>
          </div>
          <hr />
          <div className="flex justify-between text-lg font-bold text-green-600">
            <span>Total</span>
            <span>Rp.{total.toLocaleString('id-ID')}</span>
          </div>
        </div>
      </div>

      {/* Payment Method Section */}
      <div className="p-2 border bg-neutral-100/50 rounded-3xl my-5">
        <p className="font-semibold p-2 text-xl text-neutral-800">Payment Method</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* CASH */}
          <div className="bg-white border rounded-2xl p-4 shadow-md space-y-3 flex flex-col justify-between">
            <h3 className="font-semibold text-green-700 text-lg">Cash Payment</h3>

            <input
              type="text"
              inputMode="decimal"
              value={cash}
              onChange={(e) => setCash(e.target.value)}
              placeholder="Masukkan jumlah uang"
              className="w-full border rounded-xl p-2 text-sm focus:outline-none"
            />

            <div className="text-sm text-gray-700 space-y-1">
              <p>Total: Rp.{total.toLocaleString('id-ID')}</p>
              <p>Amount: Rp.{cashParsed.toLocaleString('id-ID', { minimumFractionDigits: 2 })}</p>
              <p className={`${change < 0 ? 'text-red-500' : 'text-green-600'} font-semibold`}>
                Change: Rp.{(change > 0 ? change : 0).toLocaleString('id-ID')}
              </p>
            </div>

            <button
            className="bg-green-600 text-white text-sm px-4 py-2 rounded-xl font-semibold hover:bg-green-700 transition-colors w-full"
            disabled={change < 0}
            onClick={() => {
                if (change < 0 || cash.trim() === '') {
                return Swal.fire({
                    title: 'Input Uang Cash!',
                    text: 'Silakan masukkan jumlah uang tunai terlebih dahulu.',
                    icon: 'error',
                    confirmButtonText: 'Oke'
                });
                }

                onProcess(customerName, "Cash"); // ✅ kirim metode
                localStorage.removeItem('customerName')
                setPage('products');
            }}
            >
            Pay
            </button>
          </div>

          {/* QRIS */}
          <div className="bg-white border rounded-2xl p-4 shadow-md space-y-3">
            <h3 className="font-semibold text-green-700 text-lg">QRIS Payment</h3>
            <p className="text-sm text-gray-600">Scan QR Code</p>
            <img
              src="qr-code.jpg"
              alt="QR Code"
              className="w-32 h-32 mx-auto rounded-lg border"
            />
            <button
            className="bg-green-600 text-white text-sm px-4 py-2 rounded-xl font-semibold hover:bg-green-700 transition-colors w-full"
            onClick={() => {
                onProcess(customerName, "QRIS") // ✅ kirim metode
                localStorage.removeItem('customerName')
                setPage('products');
            }}
            >
            Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentGateway;
