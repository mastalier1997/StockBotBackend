import express from "express";
import bodyParser from "body-parser";
import http from "http";
import cors from "cors";
import { router } from "./routes/stocks";
import { addStockAtTime } from "./controllers/stockPicker";

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: '*'
}));

app.use("/stocks", router);

app.get("/", (req, res) => res.send("Hello from server!"));

app.set("port", PORT);

http
  .createServer(app)
  .listen(PORT, () => console.log(`Node app running at localhost:${PORT}`));

addStockAtTime(10, 0); // 10am (server timezone)
