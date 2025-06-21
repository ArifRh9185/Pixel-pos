const Cart = ({ cart }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Keranjang</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Belum ada item.</p>
      ) : (
        <ul className="space-y-1">
          {cart.map((item, index) => (
            <li key={index} className="border p-2 rounded flex justify-between">
              <span>{item.name}</span>
              <span>Rp {item.price.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Cart
