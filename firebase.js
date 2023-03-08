// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArUvcXBgTVIv_LL6HZfaR9L4Oa3GSx_IY",
  authDomain: "dapp-2456f.firebaseapp.com",
  projectId: "dapp-2456f",
  storageBucket: "dapp-2456f.appspot.com",
  messagingSenderId: "332429974302",
  appId: "1:332429974302:web:47f48af3669f30f35d070f",
  measurementId: "G-2N73T5EZMP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FirebaseStorage = getStorage(app)
// firebase.initializeApp(firebaseConfig);
// const FirebaseStorage = firebase.storage();
// export default FirebaseStorage