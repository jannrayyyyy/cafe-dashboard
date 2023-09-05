import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB8ie-51vDo1llTo1714o3WSTrGuoevLdA",
    authDomain: "coffee-urban.firebaseapp.com",
    projectId: "coffee-urban",
    storageBucket: "coffee-urban.appspot.com",
    messagingSenderId: "314480626279",
    appId: "1:314480626279:web:c7e867d39fa23b7a1a22c2"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
