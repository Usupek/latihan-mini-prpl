import express from "express";

const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.status(200).json({success: true, message: "test dulu ganteng"})
})

app.listen(PORT, () => {
  console.log("backend nya jalan bang di", PORT);
})
