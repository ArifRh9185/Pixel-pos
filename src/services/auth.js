import {
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth'
import { auth } from '../firebase'

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })

  await setPersistence(auth, browserSessionPersistence)
  const result = await signInWithPopup(auth, provider)
  return result.user
}
