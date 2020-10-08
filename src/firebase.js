// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app'

// Add the Firebase products that you want to use
import 'firebase/auth'
import 'firebase/database'
import 'firebase/analytics'

firebase.initializeApp({
  apiKey: 'AIzaSyA8dy0me89LJvHSQ6fIeGxMAgrxMRvIVaQ',
  authDomain: 'dooeet-a7f63.firebaseapp.com',
  databaseURL: 'https://dooeet-a7f63.firebaseio.com',
  projectId: 'dooeet-a7f63',
  storageBucket: 'dooeet-a7f63.appspot.com',
  messagingSenderId: '277490811595',
  appId: '1:277490811595:web:77db5abd685a14ed2d514e',
  measurementId: 'G-RLVZ0BRR64',
})

firebase
  .auth()
  .getRedirectResult()
  .then((result) => {
    console.info('Auth redirect success', result)
  })
  .catch((error) => {
    console.error('Auth redirect error', error)
  })

export default firebase
