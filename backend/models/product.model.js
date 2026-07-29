import mongoose from "mongoose";

const productOptionSchema = new mongoose.Schema(
  {
    variant_name: {
      type: String,
      required: true,
    },
    color_value: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { _id: false },
);

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["camera", "sensor", "accessory", "plan"],
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    required: {
      type: Boolean,
      default: false,
    },
    options: {
      type: [productOptionSchema],
      default: undefined,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

export default Product;