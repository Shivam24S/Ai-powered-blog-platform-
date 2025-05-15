import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import HttpError from "./middlewares/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config({ path: "./.dev.env" });

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.json("hello");
});

//undefined route handler

app.use((req, res, next) => {
  const error = new HttpError("requested route not found", 400);
  next(error);
});

// centralized error handling

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "something went wrong" });
});

export default app;
