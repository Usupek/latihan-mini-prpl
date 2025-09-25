import express from "express";
import "dotenv/config";

import { connectDB } from "./db.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).json({success: true, message: "test dulu ganteng"})
})

app.listen(PORT, () => {
  console.log("backend nya jalan bang di", PORT);
  connectDB();
})
