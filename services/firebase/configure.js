import firebase from "firebase";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuSsrXqZirGr_WtH8FNsJAvJUpBjL55C4",		   
  authDomain: "react-native-client-be278.firebaseapp.com",
  projectId: "react-native-client-be278",
  storageBucket: "react-native-client-be278.appspot.com",
  messagingSenderId: "736611840208",
  appId: "1:736611840208:web:025d64906fcbdf68e1aed5",		 
  measurementId: "G-7XBXSD9ZVL",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  // if already initialized, use that one
  firebase.app();
}

export const auth = firebase.auth();
