import NavbarNav from "./NavbarNav"

const Checkout = () => {

  return (
    <div className='w-full 2xl:container scrollbar-hide flex mx-auto'>
      <NavbarNav />
      <div className="pt-4 border-t mt-4">
        <h2 className="text-xl font-semibold">Total: Rp</h2>
        <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded">
          Bayar
        </button>
      </div>
    </div>
  )
}

export default Checkout
