import express from "express";
import dotenv from "dotenv";
const app = express();

dotenv.config();

app.listen(3000, () => {
  console.log("App successfully listening on port 3000");
});