import dotenv from "dotenv";
dotenv.config({ path: "./.dev.env" });

import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("hello");
});

export default app;
