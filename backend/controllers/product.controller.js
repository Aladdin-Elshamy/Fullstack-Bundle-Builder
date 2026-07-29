import Product from "../models/product.model.js";

const getProductsByCategory = (category) => async (_req, res) => {
  try {
    const products = await Product.find({ category })
      .select("-_id -__v -createdAt -updatedAt")
      .lean();

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(`Error in getting ${category} products: ${error}`);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getCameraProducts = getProductsByCategory("camera");
export const getPlanProducts = getProductsByCategory("plan");
export const getSensorProducts = getProductsByCategory("sensor");
export const getAccessoryProducts = getProductsByCategory("accessory");
