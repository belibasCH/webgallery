// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; 
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3zUULVtDIdnXGsVJTlUJAKEPRqG5a_MM",
  authDomain: "webgalery-395509.firebaseapp.com",
  databaseURL: "https://webgalery-395509-default-rtdb.firebaseio.com",
  projectId: "webgalery-395509",
  storageBucket: "webgalery-395509.appspot.com",
  messagingSenderId: "883848466175",
  appId: "1:883848466175:web:3074cb6381f73d889b06ca"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);