import React from 'react'
import { PrimaryButton } from '../primitives/Button'
import { View } from '../primitives/View'
import firebase from '../firebase'

export const Login = () => {
  const handleLoginClick = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  }
  return (
    <View css={{ flex: '1', bg: 'red' }}>
      <PrimaryButton onClick={handleLoginClick}>Login</PrimaryButton>
    </View>
  )
}
