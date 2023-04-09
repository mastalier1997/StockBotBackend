import {
  getDocs,
  collection,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  where,
  query,
} from "firebase/firestore";
import { Stock } from "../interfaces/stockInterface";
import { Request, Response } from "express";
import { db } from "../db/firebase";

export async function getStocks(req: Request, res: Response) {
  try {
    const querySnapshot = await getDocs(collection(db, "stocks"));
    let resArr: any = [];
    querySnapshot.forEach((doc) => {
      resArr.push(doc.data());
    });
    res.send(resArr);
  } catch (error) {
    console.error(error);
  }
}

export async function addStock(req: Request, res: Response) {
  let data: Stock = req.body;
  const currDate = new Date();
  data.dbTimestamp = currDate.toISOString();
  try {
    const querySnapshot = await getDocs(collection(db, "stocks"));
    let containsStock = false;
    querySnapshot.forEach((doc) => {
      if (doc.data().symbol === data.symbol) {
        containsStock = true;
        return;
      }
    });
    if (!containsStock) {
      await setDoc(doc(db, "stocks", data.symbol), data);
      console.log("Document added to database");
    } else {
      console.log("Element is already in collection");
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  res.send("Data Received: " + JSON.stringify(data));
}

export async function updateStock(req: Request, res: Response) {
  let data: Stock = req.body;
  const currDate = new Date();
  try {
    const stockRef = doc(db, "stocks", data.symbol);
    await updateDoc(stockRef, {
      dbTimestamp: currDate.toISOString(),
    });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
  res.send("Document succesfully updated");
}
