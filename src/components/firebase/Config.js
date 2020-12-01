// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'
require('dotenv').config()

const firebaseConfig = {
    apiKey: "AIzaSyAwkNUgUG4WuZJ4753Dt9Twf2Mnrd-3sCc",
    authDomain: "tada-92154.firebaseapp.com",
    databaseURL: "https://tada-92154.firebaseio.com",
    projectId: "tada-92154",
    storageBucket: "tada-92154.appspot.com",
    messagingSenderId: "605080485367",
    appId: "1:605080485367:web:1efe63a95fbe2d5c79c2f2",
    measurementId: "G-YV661MNHH9"
  };

  firebase.initializeApp(firebaseConfig)

  export const Auth = firebase.auth()

  export const DB = firebase.firestore()

  export const Storage = firebase.storage()
  export const Provider = new firebase.auth.GoogleAuthProvider()