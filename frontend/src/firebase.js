import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZV3yX8WakaPV49goZKHUA4_OrMMHqm-M",
  authDomain: "campas-os.firebaseapp.com",
  projectId: "campas-os",
  storageBucket: "campas-os.firebasestorage.app",
  messagingSenderId: "504579428895",
  appId: "1:504579428895:web:00dda318f331e52f187b2a",
  measurementId: "G-SB6DCQM598",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

console.log("✅ Firebase Connected");