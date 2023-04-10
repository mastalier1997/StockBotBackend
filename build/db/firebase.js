"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const app_1 = require("firebase/app");
const firebaseconfig_1 = __importDefault(require("../firebaseconfig"));
const firestore_1 = require("firebase/firestore");
const firebaseApp = (0, app_1.initializeApp)(firebaseconfig_1.default);
const db = (0, firestore_1.getFirestore)();
exports.db = db;
