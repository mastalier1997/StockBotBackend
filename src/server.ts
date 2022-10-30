import express from "express";
import http from "http";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./firebaseconfig";
import { collection, getDocs } from "firebase/firestore";

const app = express();

const PORT = process.env.PORT || 8080;

const firestore = initializeApp(firebaseConfig);

const db = getFirestore(firestore);

//getDBData();

app.get("/", (req, res) => res.send("Hello from server!"));

app.set("port", PORT);

http
  .createServer(app)
  .listen(PORT, () => console.log(`Node app running at localhost:${PORT}`));

async function getDBData() {
  const querySnapshot = await getDocs(collection(db, "test"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
}
