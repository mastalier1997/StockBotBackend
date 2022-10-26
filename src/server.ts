import express from "express";
import http from "http";

const app = express();

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => res.send("Hello from server!"));

app.set('port', PORT);

http.createServer(app).listen(PORT, () => console.log(`Node app running at localhost:${PORT}`));