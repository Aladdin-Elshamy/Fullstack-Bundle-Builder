import express from "express";
import {
  getAccessoryProducts,
  getCameraProducts,
  getPlanProducts,
  getSensorProducts,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/cameras", getCameraProducts);
router.get("/plans", getPlanProducts);
router.get("/sensors", getSensorProducts);
router.get("/accessories", getAccessoryProducts);

export default router;