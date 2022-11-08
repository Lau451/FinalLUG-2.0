import { Request, Response } from "express";
import ProductModel from "../models/product";

export const AddProductController = {
    post: async (req:Request, res:Response) => {

        /*desarmamos el producto*/
        const { name, precio } = req.body;
        
         /* Nos fijamos si tenemos el producto*/
        const estaEnProducts = await ProductModel.findOne({name});

        /* Nos fijamos si todos los campos vienen con info */
        const noEstaVacio = name !== "" && precio !== "";

        /* Si tenemos el producto */
        if (estaEnProducts) {
            res.status(400).json({
              mensaje: "Este producto ya se encuentra registrado",
            })

        } else if (noEstaVacio && !estaEnProducts) {
            const newProduct = new ProductModel({name, precio, enCart: false,});

            newProduct.save();
              res.json({
                mensaje: "El producto fue agregado"
            
            })

  
        }
    }
}