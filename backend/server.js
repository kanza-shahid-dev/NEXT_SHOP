import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

//Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);
app.use(express.json({ limit: "10mb" }));

app.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("db connected"))
    .catch((error) => console.log("DB error", error));
});

app.use("/product", productRoutes);
app.use("/images", express.static("images"));
