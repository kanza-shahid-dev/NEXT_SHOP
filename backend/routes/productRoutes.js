import express from "express";
import path from "path";
import fs from "fs/promises";
import Product from "../models/product.js";
import upload from "../utils/imageUploader.js";
import { convertImageToSvg } from "../utils/convertImage.js";

const router = express.Router();

router.post("/add", upload.single("image"), async (req, res) => {
  const { name, price, description, imageData, imagePath } = req.body;

  console.log("file", req.file);
  try {
    const filePath = req.file.path;
    const svgPath = filePath.replace(path.extname(filePath), ".svg");

    await convertImageToSvg(filePath, svgPath);

    await fs.unlink(filePath);

    const newProduct = new Product({
      name,
      price,
      description,
      imageData,
      coverImage: `/images/${path.basename(svgPath)}`,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(400).json({ message: "Error", error: error.message });
  }
});

router.get("/list", async (req, res) => {
  try {
    const data = await Product.find();
    const formattedProducts = data.map((product) => ({
      id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      imageData: product.imageData,
      coverImage: product.coverImage,
    }));

    return res.status(200).json(formattedProducts);
  } catch (error) {
    return res.send({ error: error.message });
  }
});

export default router;
