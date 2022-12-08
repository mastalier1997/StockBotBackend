import express from "express";
import http from "http";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseconfig";

const app = express();

const PORT = process.env.PORT || 8080;

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore();

app.get("/test", async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    let resArr: any = [];
    querySnapshot.forEach((doc) => {
      resArr.push(doc.data());
    });
    res.send(resArr);
  } catch (error) {
    console.error(error);
  }
});

app.get("/", (req, res) => res.send("Hello from server!"));

app.set("port", PORT);

http
  .createServer(app)
  .listen(PORT, () => console.log(`Node app running at localhost:${PORT}`));
