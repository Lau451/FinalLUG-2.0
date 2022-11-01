import { Request, Response } from "express";
import { CartModel} from "../models/cart";
import { ProductModel} from "../models/product";

export const GetProductCartController = {
get: async (req:Request, res:Response) => {
    const productsCart = await CartModel.find(); 
    /* si hay productos en el carrito los devolvemos*/
    if (productsCart) {
      res.json({ productsCart });
    } else {
      res.json({ mensaje: "No hay productos en el carrito" });
    }
  }
}