import { useState } from 'react'
import NavbarNav from '../components/NavbarNav'
import ProductList from '../components/ProductList'
import OrderList from '../components/OrderList'
import History from '../components/History'
import Bills from '../components/Bills'
import Settings from '../components/Settings'
import Help from '../components/Help'
import { generateTransactionId } from '../utils/generatedId'
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase';
import { useEffect } from 'react'
import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore'
import Swal from 'sweetalert2'
import { ClipLoader } from 'react-spinners'
import PaymentGate from '../components/PaymentGateway'



const MainApp = () => {
  const [page, setPage] = useState('products')
  const [cart, setCart] = useState([])
  const [receiptData, setReceiptData] = useState([])

  const { user, loading } = useAuth()

  // Fetch receipts from Firestore on login
  useEffect(() => {
    const fetchReceipts = async () => {
      if (!user || loading) return

      const q = query(collection(db, 'receipts'), where('uid', '==', user.uid))
      const querySnapshot = await getDocs(q)
      const fetchedData = querySnapshot.docs.map((doc) => doc.data())

      setReceiptData(fetchedData)
    }

    fetchReceipts()
  }, [user, loading])

  const handleSendToReceipt = async (customerName = 'Unknown Customer', paymentMethod = 'Cash') => {
    if (cart.length === 0 || !user) return

    const newReceipt = {
      id: generateTransactionId(),
      uid: user.uid,
      customer: customerName,
      items: cart,
      paymentMethod,
      timestamp: Timestamp.now()
    }
    if (newReceipt.customer === '') {
      return Swal.fire({
        title: 'Customer Name Required',
        text: 'Silahkan Isi Nama Customer',
        icon: 'error',
        confirmButtonText: 'oke'
      });}

    try {
      await addDoc(collection(db, 'receipts'), newReceipt)
      setReceiptData((prev) => [...prev, newReceipt])
      setCart([])
        Swal.fire({
            title: 'Receipt Saved',
            text: 'Receipt has been saved successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
        })
      
    } catch (error) {
      console.error('Error saving receipt:', error)
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <ClipLoader
            color='#00a63e'
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />      
        </div>
  if (!user) return <div className="p-8 text-center text-red-500">Unauthorized</div>


  return (
    <div className="flex xl:container mx-auto">
      <NavbarNav setPage={setPage} currentPage={page} receiptData={receiptData} />
      <main className="flex-1">
        {page === 'products' && <ProductList cart={cart} setCart={setCart} onProcess={(name) => handleSendToReceipt(name)} setPage={setPage}/>}
        {page === 'OrderList' && <OrderList data={receiptData}/>}
        {page === 'history' && <History data={receiptData}/>}
        {page === 'bills' && <Bills />}
        {page === 'settings' && <Settings />}
        {page === 'help' && <Help />}
        {page === 'payment' && <PaymentGate cart={cart} setPage={setPage} onProcess={(name, method) => handleSendToReceipt(name, method)}/>}
      </main>
    </div>
  )
}

export default MainApp
