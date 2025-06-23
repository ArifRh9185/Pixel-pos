import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { firebaseConfig } from './firebaseconfig'
import { getFirestore } from 'firebase/firestore'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const db = getFirestore(app) // ✅ Bukan `AppWindowMac`

export { auth, provider, signInWithPopup, signOut, db }
