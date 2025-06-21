import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { VscSignOut } from "react-icons/vsc"
import { getAuth, signOut } from 'firebase/auth'

const SignOutButton = ({title}) => {
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const handleLogout = async () => {
    const auth = getAuth()
    await signOut(auth)             // Sign out dari Firebase
    localStorage.removeItem('user') // Hapus dari localStorage
    setUser(null)                   // Hapus dari context
    navigate('/login')              // Arahkan ke halaman login
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full hover:bg-gray-600 hover:text-white text-neutral-500 px-3 py-1 rounded flex justify-center items-center gap-2 transition-colors duration-200"
    >
      <VscSignOut /> {title}
    </button>
  )
}

export default SignOutButton
