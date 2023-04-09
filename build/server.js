"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const firestore_1 = require("firebase/firestore");
const firestore_2 = require("firebase/firestore");
const app_1 = require("firebase/app");
const firebaseconfig_1 = __importDefault(require("./firebaseconfig"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const PORT = process.env.PORT || 8080;
const firebaseApp = (0, app_1.initializeApp)(firebaseconfig_1.default);
const db = (0, firestore_1.getFirestore)();
let testObj = {
    symbol: "GOOG",
    name: "Google Inc.",
    buydate: "12.12.2021",
    shares_count: 2,
    price: 100,
};
app.get("/stocks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const querySnapshot = yield (0, firestore_2.getDocs)((0, firestore_2.collection)(db, "stocks"));
        let resArr = [];
        querySnapshot.forEach((doc) => {
            resArr.push(doc.data());
        });
        res.send(resArr);
    }
    catch (error) {
        console.error(error);
    }
}));
app.post("/stocks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = req.body;
    try {
        const docRef = yield (0, firestore_1.addDoc)((0, firestore_2.collection)(db, "users"), {
            first: "Alan",
            middle: "Mathison",
            last: "Turing",
            born: 1912,
        });
        console.log("Document written with ID: ", docRef.id);
    }
    catch (e) {
        console.error("Error adding document: ", e);
    }
    res.send("Data Received: " + JSON.stringify(data));
}));
app.get("/", (req, res) => res.send("Hello from server!"));
app.set("port", PORT);
http_1.default
    .createServer(app)
    .listen(PORT, () => console.log(`Node app running at localhost:${PORT}`));
