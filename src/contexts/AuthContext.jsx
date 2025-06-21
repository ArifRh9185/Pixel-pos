import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // Cek jika ini pertama kali app dibuka dan user sudah login
      const isFirstOpen = !sessionStorage.getItem('hasVisited')
      if (isFirstOpen && user) {
        console.log('🚪 First open + user logged in, force logout...')
        await signOut(auth)
        sessionStorage.setItem('hasVisited', 'true')
        setUser(null)
        setLoading(false)
        return
      }

      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }

      // Tandai bahwa tab ini sudah pernah dibuka
      sessionStorage.setItem('hasVisited', 'true')
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
