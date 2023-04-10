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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStock = exports.addStock = exports.getStocks = void 0;
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("../db/firebase");
function getStocks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const querySnapshot = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(firebase_1.db, "stocks"));
            let resArr = [];
            querySnapshot.forEach((doc) => {
                resArr.push(doc.data());
            });
            res.send(resArr);
        }
        catch (error) {
            console.error(error);
        }
    });
}
exports.getStocks = getStocks;
function addStock(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = req.body;
        const currDate = new Date();
        data.dbTimestamp = currDate.toISOString();
        try {
            const querySnapshot = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(firebase_1.db, "stocks"));
            let containsStock = false;
            querySnapshot.forEach((doc) => {
                if (doc.data().symbol === data.symbol) {
                    containsStock = true;
                    return;
                }
            });
            if (!containsStock) {
                yield (0, firestore_1.setDoc)((0, firestore_1.doc)(firebase_1.db, "stocks", data.symbol), data);
                console.log("Document added to database");
            }
            else {
                console.log("Element is already in collection");
            }
        }
        catch (e) {
            console.error("Error adding document: ", e);
        }
        res.send("Data Received: " + JSON.stringify(data));
    });
}
exports.addStock = addStock;
function updateStock(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = req.body;
        const currDate = new Date();
        try {
            const stockRef = (0, firestore_1.doc)(firebase_1.db, "stocks", data.symbol);
            yield (0, firestore_1.updateDoc)(stockRef, {
                dbTimestamp: currDate.toISOString(),
            });
        }
        catch (e) {
            console.error("Error updating document: ", e);
        }
        res.send("Document succesfully updated");
    });
}
exports.updateStock = updateStock;
