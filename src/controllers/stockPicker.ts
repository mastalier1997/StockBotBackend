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
import { Response } from "express";
import { db } from "../db/firebase";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import fetch, { Blob, Request } from "node-fetch";
import { addNativeStock, addStock } from "./stocks";
import express from "express";

//fetch list of all stocks from nasdaq500
const getStocksFromNasdaq500 = () => {
  console.log("fetching ...");

  const nasdaqUrl =
    "https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=***REMOVED***";

  return fetch(nasdaqUrl)
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
};

//pick a random element from nasdaq500
export async function getRandomStockSymbol(): Promise<string | undefined> {
  const symbols = await getStocksFromNasdaq500();
  if (symbols.length === 0) {
    return undefined;
  }
  const randomIndex = Math.floor(Math.random() * symbols.length);

  return symbols[randomIndex].symbol;
}

const fetchStockInfo = (url: string) => {
  return fetch(url)
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
};

//TODO
//add the selected stock to the portfolio of the StockBot
export async function addStockToDb() {
  const stockToAdd = await getRandomStockSymbol();
  console.log("stockToAdd: " + stockToAdd);

  const url =
    "https://query1.finance.yahoo.com/v8/finance/chart/" +
    stockToAdd +
    "?region=US&lang=en-US&includePrePost=false&interval=1d&useYfid=true&range=1d&corsDomain=finance.yahoo.com&.tsrc=finance";

  const json = await fetchStockInfo(url);

  const stock: Stock = {
    symbol: json.chart.result[0].meta.symbol,
    name: "unknown",
    buydate: "today",
    shares_count: 1,
    price: json.chart.result[0].meta.regularMarketPrice,
    dbTimestamp: "today",
    logoUrl: "unknown",
    companyUrl: "unknown",
    stockUrl: "unknown",
  };

  addNativeStock(stock);
}
