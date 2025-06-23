// BillDetails.jsx
import React, {useRef, useState} from 'react';

const BillDetails = ({ cart, setCart, onProcess}) => {
  const printRef = useRef();
  const [customerName, setCustomerName] = useState("")


  // const handlePrint = () => {
  //   const printContent = printRef.current.innerHTML;
  //   const originalContent = document.body.innerHTML;

  //   document.body.innerHTML = printContent;
  //   window.print();
  //   document.body.innerHTML = originalContent;
  //   window.location.reload(); // agar tampilan kembali normal
  // };

  const handleQtyChange = (index, delta) => {
    const updatedCart = [...cart];
    updatedCart[index].qty += delta;

    if (updatedCart[index].qty < 1) {
      updatedCart.splice(index, 1);
    }

    setCart(updatedCart);
  };

  const subtotal = cart.reduce((sum, item) => {
    const itemPrice = Number(item.price) || 0;
    return sum + itemPrice * item.qty;
  }, 0);

  const discount = subtotal * 0.15;
  const tax = (subtotal - discount) * 0.1;
  const total = subtotal - discount + tax;

  return (
    <div className="sticky top-0 right-0 h-screen w-150 bg-white shadow-lg border-l border-neutral-200 flex flex-col justify-between font-inter z-50">
      <div className="px-6 scrollbar-hide py-6 overflow-y-auto" ref={printRef}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Bill Details</h2>
        </div>

        <div className="mb-4">
          <label className="block text-neutral-700 text-sm font-semibold mb-3">Customer Name</label>
          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none shadow-sm"
          />
        </div>

        {cart.map((item, index) => {
          const itemPrice = Number(item.price) || 0;
          return (
            <div key={index} className="border-t border-neutral-200 pt-4 mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-neutral-700 text-sm">{item.name}</h3>
                  <div className="text-xs text-gray-500 mt-1 space-y-1">
                    <p>Cup Size: {item.cupSize}</p>
                    <p>Ice Level: {item.iceLevel}</p>
                    <p>Sugar Level: {item.sugarLevel}</p>
                  </div>
                </div>
                <p className="font-semibold text-sm text-green-600">
                  Rp.{(itemPrice * item.qty).toLocaleString('id-ID')}k
                </p>
              </div>
              <div className="flex items-center justify-between mt-2 text-sm">
                <span>Amount</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQtyChange(index, -1)}
                    className="w-6 h-6 rounded bg-gray-200 font-bold"
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => handleQtyChange(index, 1)}
                    className="w-6 h-6 rounded bg-gray-200 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        <hr className="my-4 border-neutral-200" />

        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Item</span>
            <span className="text-neutral-700 font-semibold">{cart.length} Items</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal</span>
            <span className="text-neutral-700 font-semibold">Rp.{subtotal.toLocaleString('id-ID')}k</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span className="text-gray-500">Discount (15%)</span>
            <span className="font-semibold">-Rp.{discount.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Tax (10%)</span>
            <span className="text-neutral-700 font-semibold">Rp.{tax.toLocaleString('id-ID')}</span>
          </div>
        </div>

        <hr className="my-4 border-neutral-200" />

        <div className="flex justify-between text-lg font-bold text-green-600">
          <span>Total</span>
          <span>Rp.{total.toLocaleString('id-ID')}k</span>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Select Table</label>
          <select className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-600 focus:outline-none shadow-sm">
            <option>Select Table</option>
            <option>Table 1</option>
            <option>Table 2</option>
            <option>Table 3</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">Select Payment</label>
          <div className="flex gap-3">
            <div className="border rounded-xl px-3 py-2 flex-1 text-center text-green-600 font-semibold border-green-300 bg-green-50 cursor-pointer">
              Pay with Cash
            </div>
            <div className="border rounded-xl px-3 py-2 flex-1 text-center text-gray-600 font-semibold cursor-pointer">
              Pay with Card
            </div>
          </div>
        </div>
      </div>

      <button 
      onClick={ () => onProcess(customerName) }
      className="w-full py-3 bg-green-600 text-white font-semibold text-sm rounded-b-2xl hover:bg-green-700 transition-colors duration-200">
        Process Transaction
      </button>
    </div>
  );
};

export default BillDetails;
