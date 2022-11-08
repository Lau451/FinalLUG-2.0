import { Request, Response } from "express";
import ProductModel from "../models/product";


export const GetProductController = {
  get: async (req: Request, res: Response) => {
    const products = await ProductModel.find();

  /* si hay producto los devolvemos*/  
  if (products) {
    res.json({ products });
  } else {
    res.json({ mensaje: "No hay productos" });
  }
 }
};

