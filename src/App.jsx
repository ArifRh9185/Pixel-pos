import { Routes, Route } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import NotFound from './pages/NotFound'
import MainApp from './pages/mainApp'
import Login from './pages/Login'
import { ClipLoader } from 'react-spinners'

const App = () => {
  const { user, loading } = useAuth()

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <ClipLoader
          color='#00a63e'
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />      
      </div>

  return (
    <Routes>
      <Route path="/" element={user ? <MainApp /> : <Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
