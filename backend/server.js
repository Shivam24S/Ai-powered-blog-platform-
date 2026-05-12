import dotenv from "dotenv";

dotenv.config({ path: "./.dev.env" });

import http from "http";

import connectDB from "./config/db.js";

import app from "./app.js";
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

export async function startServer() {
  try {
    await connectDB();

    server.listen(PORT, (err) => {
      if (err) {
        console.log("server starting error", err.message);
      }
      console.log(`server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
}

startServer();
