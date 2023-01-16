// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyDJLpMaGUMvJmUvaoW6aYlb-O8NCEu6TiM",
  authDomain: "whatsapp-clone-45597.firebaseapp.com",
  projectId: "whatsapp-clone-45597",
  storageBucket: "whatsapp-clone-45597.appspot.com",
  messagingSenderId: "730338124345",
  appId: "1:730338124345:web:85091ab01dfe004765e3e8",
  measurementId: "G-FRGE4FGS9L"
  };

  const firebaseApp = firebase.initializeApp
  (firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;