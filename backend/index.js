import express from "express";
import cors from "cors";
import "dotenv/config";

import { connectDB } from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  res.status(200).json({success: true, message: "test dulu ganteng"})
})

app.listen(PORT, () => {
  console.log("backend nya jalan bang di", PORT);
  connectDB();
})
