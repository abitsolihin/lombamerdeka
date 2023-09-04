// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAtZX4huvhLDe6BP-md60A16Qhx-9ITqpc",
    authDomain: "lombamerdeka-eca0a.firebaseapp.com",
    databaseURL: "https://lombamerdeka-eca0a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "lombamerdeka-eca0a",
    storageBucket: "lombamerdeka-eca0a.appspot.com",
    messagingSenderId: "184870438585",
    appId: "1:184870438585:web:bd0d135101569e5633bd68",
    measurementId: "G-QM6WPB3LNV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export const db = getFirestore(app)
// Initialize Cloud Storage and get a reference to the service
