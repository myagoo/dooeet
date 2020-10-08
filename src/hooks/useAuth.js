import { useEffect, useState } from 'react'
import firebase from '../firebase'

export const useAuth = () => {
  const [state, setState] = useState({
    initializing: true,
    user: null,
  })

  function onChange(user) {
    setState({
      initializing: false,
      user,
    })
  }

  useEffect(() => {
    // listen for auth state changes
    const unsubscribe = firebase.auth().onAuthStateChanged(onChange)
    // unsubscribe to the listener when unmounting
    return () => unsubscribe()
  }, [])

  return state
}
