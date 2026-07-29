import fs from "fs";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import Product from "../models/product.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDirectory = path.resolve(__dirname, "../data");

const readProductsFile = (fileName) => {
  const filePath = path.join(dataDirectory, fileName);
  const fileContent = fs.readFileSync(filePath, "utf-8");

  return JSON.parse(fileContent);
};

const getProductsFromJson = (fileName) => (_req, res) => {
  try {
    const products = readProductsFile(fileName);

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(`Error in getting ${fileName}: ${error}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getCameraProducts = getProductsFromJson("cameras.json");
export const getPlanProducts = getProductsFromJson("plans.json");
export const getSensorProducts = getProductsFromJson("sensors.json");
export const getAccessoryProducts = getProductsFromJson("accessories.json");
