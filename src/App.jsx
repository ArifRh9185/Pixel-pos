// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import ProductList from './components/ProductList'
import Checkout from './components/Checkout'
import { useAuth } from './contexts/AuthContext'
import NotFound from './pages/NotFound'

const App = () => {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/" element={<Navigate to={user ? '/products' : '/login'} />} />
      <Route path="/login" element={user ? <Navigate to="/products" /> : <Login />} />
      <Route path="/products" element={user ? <ProductList /> : <Navigate to="/login" />} />
      <Route path="/checkout" element={user ? <Checkout /> : <Navigate to="/login" />} />
      <Route path="*" element={user ? <NotFound/> : '/login'} />
    </Routes>
  )
}

export default App
