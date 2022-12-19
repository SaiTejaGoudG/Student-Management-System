import firebase from 'firebase/compat/app'
import database from 'firebase/compat/database'
import 'firebase/compat/auth'
// import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDQEcPvvbtBWkTIlXAA_OqLxhF146bcl2U",
    authDomain: "student-management-syste-c53fb.firebaseapp.com",
    databaseURL: "https://student-management-syste-c53fb-default-rtdb.firebaseio.com",
    projectId: "student-management-syste-c53fb",
    storageBucket: "student-management-syste-c53fb.appspot.com",
    messagingSenderId: "23733216413",
    appId: "1:23733216413:web:17bad7cca590dec8e9a074",
    measurementId: "G-786ZZH3XJZ"
  };
  

  var firebasedb = firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth()
  export default firebasedb.database().ref()

  
