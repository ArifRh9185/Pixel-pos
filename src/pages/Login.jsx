import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithGoogle } from '../services/auth'
import { useAuth } from '../contexts/AuthContext'
import logo from '../assets/logo.jpg' // pastikan logo ada atau comment aja kalau error
import { ClipLoader } from "react-spinners";


const Login = () => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  // Redirect ke /products jika user sudah login
  useEffect(() => {
    if (!loading && user) {
      navigate('/products')
    }
  }, [user, loading, navigate])

  const handleLogin = async () => {
    try {
      await signInWithGoogle()
      // Setelah login, AuthContext akan otomatis update, dan useEffect akan jalan
    } catch (error) {
      console.error('❌ Login failed:', error)
    }
  }

  // ⏳ Saat auth masih loading, tampilkan tulisan "Loading..."
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <ClipLoader
          color='#00a63e'
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />      
      </div>
    )
  }

  // Kalau belum login dan tidak loading, tampilkan tombol login
  return (
    <div className="min-h-screen font-lato flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow text-center space-y-4 w-80">
        <h1 className="text-2xl font-bold">Selamat Datang di</h1>
        <img src={logo} alt="Logo" className="mx-auto mb-4" />
        <p className="text-gray-600">Silakan login dengan Google</p>
        <button
          onClick={handleLogin}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full"
        >
          Login with Google
        </button>
      </div>
    </div>
  )
}

export default Login
