import express from "express";
import {
  addStock,
  getStocks,
  updateStock,
} from "../controllers/stocksEndpoint";

const router = express.Router();

router.get("/", getStocks);
router.post("/", addStock);
router.put("/", updateStock);

export { router };
