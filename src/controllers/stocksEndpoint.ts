import {
  getDocs,
  collection,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Stock } from "../interfaces/stockInterface";
import { Request, Response } from "express";
import { db } from "../db/firebase";

//name of the collection in firebase
const stockBotPortfolio_Dev: Readonly<string> = "StockBotPortfolio_Dev";

//GET Stocks
export async function getStocks(req: Request, res: Response) {
  try {
    const querySnapshot = await getDocs(collection(db, stockBotPortfolio_Dev));
    let resArr: any = [];
    querySnapshot.forEach((doc) => {
      resArr.push(doc.data());
    });
    res.send(resArr);
  } catch (error) {
    console.error(error);
  }
}

//POST Stock
//adds a stock to the bot portfolio
export async function addNativeStock(stock: Stock) {
  let stockToAdd: Stock = stock;
  const currDate = new Date();
  stockToAdd.dbTimestamp = currDate.toISOString();

  try {
    const querySnapshot = await getDocs(collection(db, stockBotPortfolio_Dev));
    let containsStock = false;
    querySnapshot.forEach((doc) => {
      if (doc.data().symbol === stockToAdd.symbol) {
        containsStock = true;
        return;
      }
    });
    if (!containsStock) {
      await setDoc(
        doc(db, stockBotPortfolio_Dev, stockToAdd.symbol),
        stockToAdd
      );
      console.log("Document added to database: " + stock.symbol);
    } else {
      console.log("Element is already in collection: " + stock.symbol);
    }
  } catch (e) {
    console.error("Error adding document: " + stock.symbol, e);
  }
}

//POST Stock
export async function addStock(req: Request, res: Response) {
  let data: Stock = req.body;
  const currDate = new Date();
  data.dbTimestamp = currDate.toISOString();
  try {
    const querySnapshot = await getDocs(collection(db, stockBotPortfolio_Dev));
    let containsStock = false;
    querySnapshot.forEach((doc) => {
      if (doc.data().symbol === data.symbol) {
        containsStock = true;
        return;
      }
    });
    if (!containsStock) {
      await setDoc(doc(db, stockBotPortfolio_Dev, data.symbol), data);
      console.log("Document added to database");
    } else {
      console.log("Element is already in collection");
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  res.send("Data Received: " + JSON.stringify(data));
}

//PUT Stock
export async function updateStock(req: Request, res: Response) {
  let data: Stock = req.body;
  const currDate = new Date();
  try {
    const stockRef = doc(db, stockBotPortfolio_Dev, data.symbol);
    await updateDoc(stockRef, {
      dbTimestamp: currDate.toISOString(),
    });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
  res.send("Document succesfully updated");
}
