"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const stocks_1 = require("../controllers/stocks");
const router = express_1.default.Router();
exports.router = router;
router.get("/", stocks_1.getStocks);
router.post("/", stocks_1.addStock);
router.put("/", stocks_1.updateStock);
