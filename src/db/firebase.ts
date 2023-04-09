import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebaseconfig";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();

export { db };
