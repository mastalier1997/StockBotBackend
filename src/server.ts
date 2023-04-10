import express from "express";
import bodyParser from "body-parser";
import http from "http";
import { addDoc, getFirestore, query, where } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { Stock } from "./interfaces/stockInterface";
import { db } from "./db/firebase";
import { router } from "./routes/stocks";

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.use("/stocks", router)

app.get("/", (req, res) => res.send("Hello from server!"));

app.set("port", PORT);

http
  .createServer(app)
  .listen(PORT, () => console.log(`Node app running at localhost:${PORT}`));
