import firebase from 'firebase'
const firebaseConfig = {
 apiKey: "AIzaSyBJ0ERGyy6gtQG9x1mDgbkmhqqn7yr_xFc",
 authDomain: "facebook-clone-d675e.firebaseapp.com",
 projectId: "facebook-clone-d675e",
 storageBucket: "facebook-clone-d675e.appspot.com",
 messagingSenderId: "992697636074",
 appId: "1:992697636074:web:23d08aafdf0fa687277393"
};

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const storage = firebase.storage()

export { db, storage}
