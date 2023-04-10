"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const stocks_1 = require("./routes/stocks");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const PORT = process.env.PORT || 3000;
app.use("/stocks", stocks_1.router);
app.get("/", (req, res) => res.send("Hello from server!"));
app.set("port", PORT);
http_1.default
    .createServer(app)
    .listen(PORT, () => console.log(`Node app running at localhost:${PORT}`));
