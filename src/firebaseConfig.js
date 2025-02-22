// Import Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyC2JCt3nqUNpufjyFgquYXTGftww-Lltfk",
    authDomain: "micathon-9c73d.firebaseapp.com",
    projectId: "micathon-9c73d",
    storageBucket: "micathon-9c73d.firebasestorage.app",
    messagingSenderId: "1046448162841",
    appId: "1:1046448162841:web:ccd33e43b51d5b31c5c288",
    measurementId: "G-CL2Q3YJD2W"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
