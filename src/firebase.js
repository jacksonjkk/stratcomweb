import {initializeApp} from 'firebase/app'
import {getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut,updateProfile} from 'firebase/auth'
import {collection,addDoc,getDocs,updateDoc,deleteDoc,doc,onSnapshot,query,orderBy,getFirestore} from 'firebase/firestore'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiD3Nmv7HS0KCln_MEySwxiW2NBas3hto",
  authDomain: "stratcom-117bd.firebaseapp.com",
  projectId: "stratcom-117bd",
  storageBucket: "stratcom-117bd.firebasestorage.app",
  messagingSenderId: "134322447943",
  appId: "1:134322447943:web:e199189d813f5f9ee6f362",
  measurementId: "G-3H91WC8K80"
};

//initializing firebase app 
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore(app)


export{auth,db,addDoc,signInWithEmailAndPassword,createUserWithEmailAndPassword,updateProfile,updateDoc,collection,deleteDoc,onSnapshot,query,orderBy,doc,getDocs,getFirestore,signOut};