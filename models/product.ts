import { Schema, model, Types } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true, unique: true },
  enCart: { type: Boolean, default: false },
  precio: { type: Number, required: true },
});

export const ProductModel = model("Product", productSchema);
