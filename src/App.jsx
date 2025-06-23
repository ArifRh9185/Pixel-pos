import { Routes, Route } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import NotFound from './pages/NotFound'
import MainApp from './pages/mainApp'
import Login from './pages/Login'

const App = () => {
  const { user, loading } = useAuth()

  if (loading) return <div className="p-8 text-center text-gray-400">Loading...</div>

  return (
    <Routes>
      <Route path="/" element={user ? <MainApp /> : <Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
