// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDfaELH3m4FSf_smiR3AvpZ_AEpHCphVaA",
  authDomain: "admin-3b0c8.firebaseapp.com",
  projectId: "admin-3b0c8",
  storageBucket: "admin-3b0c8.appspot.com",
  messagingSenderId: "420219220577",
  appId: "1:420219220577:web:62fc56b7c492f2f094b020"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// export const storage = getStorage(app);