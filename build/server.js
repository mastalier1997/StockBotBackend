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
const http_1 = __importDefault(require("http"));
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const firebaseconfig_1 = __importDefault(require("./firebaseconfig"));
const firestore_2 = require("firebase/firestore");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
const firestore = (0, app_1.initializeApp)(firebaseconfig_1.default);
const db = (0, firestore_1.getFirestore)(firestore);
getDBData();
app.get("/", (req, res) => res.send("Hello from server!"));
app.set("port", PORT);
http_1.default
    .createServer(app)
    .listen(PORT, () => console.log(`Node app running at localhost:${PORT}`));
function getDBData() {
    return __awaiter(this, void 0, void 0, function* () {
        const querySnapshot = yield (0, firestore_2.getDocs)((0, firestore_2.collection)(db, "test"));
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });
    });
}
