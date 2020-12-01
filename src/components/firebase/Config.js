// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'
require('dotenv').config()

const firebaseConfig = {
  apiKey: "AIzaSyAx2Cctuki1u428JBmdpHBZgL4mq9WUifE",
  authDomain: "tada-advance-note.firebaseapp.com",
  databaseURL: "https://tada-advance-note.firebaseio.com",
  projectId: "tada-advance-note",
  storageBucket: "tada-advance-note.appspot.com",
  messagingSenderId: "496009385970",
  appId: "1:496009385970:web:be1d683ab686b8733c3d6b",
  measurementId: "G-TGZBTY9KJH"
};

  firebase.initializeApp(firebaseConfig)

  export const Auth = firebase.auth()

  export const DB = firebase.firestore()

  export const Storage = firebase.storage()
  export const Provider = new firebase.auth.GoogleAuthProvider()