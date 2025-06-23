// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import { useAuth } from './contexts/AuthContext'
import NotFound from './pages/NotFound'
import MainApp from './pages/mainApp'

const App = () => {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/" element={user ? <MainApp/> : <Navigate to="/login" />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
