import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5001;

//Middleware
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("db connected"))
    .catch((error) => console.log("DB error", error));
});
