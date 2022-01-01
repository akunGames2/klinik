import { Platform } from 'react-native'
import firebase from '@react-native-firebase/app'
import '@react-native-firebase/messaging'
import '@react-native-firebase/dynamic-links'

const firebaseIosConfig = {
  clientId: '784412142841-badf1klgn8umrga3dj15sbv7hetsp0sn.apps.googleusercontent.com',
  appId: '1:784412142841:ios:f48616e78b3db79a1a4628',
  apiKey: 'AIzaSyCZX9DS1GRAzLF0ZJlzEQ0ieapo1XvwIUM',
  databaseURL: 'https://linkpedia-18806.appspot.com',
  storageBucket: 'linkpedia-18806.appspot.com',
  messagingSenderId: '784412142841',
  projectId: 'linkpedia-18806',
  persistence: true,
}

const firebaseAndroidConfig = {
  clientId: '784412142841-f4jevfhanat0bnnp6fhet0odqtp56h6n.apps.googleusercontent.com',
  appId: '1:784412142841:android:107e72193e32637e1a4628',
  apiKey: 'AIzaSyA35prKXDiWuVFrnWeoV7leeC4Zda2qau8',
  databaseURL: 'https://linkpedia-18806.appspot.com',
  storageBucket: 'linkpedia-18806.appspot.com',
  messagingSenderId: '784412142841',
  projectId: 'linkpedia-18806',
  persistence: true,
}

let xlinkqu_fb
if (!firebase.apps.length) {
  xlinkqu_fb = firebase.initializeApp(
    Platform.OS === 'ios' ? firebaseIosConfig : firebaseAndroidConfig
  )
} else {
  const [x] = firebase.apps
  xlinkqu_fb = x
}

const linkqu_fb = xlinkqu_fb

export default linkqu_fb
