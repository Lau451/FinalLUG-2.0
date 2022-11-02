import { Request, Response } from "express";
import CartModel from "../models/cart";
import ProductModel from "../models/product";


export const DeleteProductController = {
   
    delete:async (req:Request, res:Response) => {

      const { productId } = req.params;
    
      /* Buscamos el producto en el carrito */
      const productInCart = await CartModel.findById(productId);
    
      /* Buscamos el producto en nuestra DB por el nombre del que esta en el carrito */
      const { name,precio,_id } = await ProductModel.findOne({
        name: productInCart?.name,
      });
    
    
      /* Buscamos y eliminamos el producto con la id */
      await CartModel.findByIdAndDelete(productId);
      
      /* Buscamos y editamos la prop inCart: false */
      /* Le pasamos la id del producto en la DB */
      /* La prop a cambiar y las demas */
      /* Y el new para devolver el producto editado */
      await ProductModel.findByIdAndUpdate(
        _id,
        { EnCart: false, name, precio },
        { new: true }
      )
        .then((product) => {
          res.json({
            mensaje: `El producto ${product?.name} fue eliminado del carrito`,
          });
        })
        .catch((error) => res.json({ mensaje: "Hubo un error" }));
    }
   
}