import { Request, Response } from "express";
import { CartModel} from "../models/cart";
import { ProductModel} from "../models/product";

export const AddProductCartController = {
    post: async (req:Request, res:Response) => {

        /*desarmamos el producto*/
        const { name, precio } = req.body;

        /* Nos fijamos si tenemos el producto (MAURO)*/
        const estaEnProducts = await ProductModel.findOne({name});
      
        /* Nos fijamos si todos los campos vienen con info */
        const noEstaVacio = name !== "" && precio !== "";
      
        /* Nos fijamos si el producto ya esta en el carrito(MAURO) */
        const estaEnElCarrito = await CartModel.findOne({name});
      
        /* Si no tenemos el producto */
        if (!estaEnProducts) {
          res.status(400).json({
            mensaje: "Este producto no se encuentra en el carrito",
          });
      
          /* Si nos envian algo y no esta en el carrito lo agregamos */
        } else if (noEstaVacio && !estaEnElCarrito) {
          const newProductInCart = new CartModel({name, precio, cantidad: 1 });
      
          /* Y actualizamos la prop inCart: true en nuestros productos */
          await ProductModel.findByIdAndUpdate(
            estaEnProducts?._id,
            { enCart: true, name, precio },
            /* El new devuelve el producto actualizado*/
            { new: true }
          )
          /*Guardamos el nuevo producto en el carrito*/
            .then((product) => {
              newProductInCart.save();
              res.json({
                mensaje: `El producto fue agregado al carrito`,
                product,
              });
            })
            .catch((error) => console.error(error));
      
          /* Y si esta en el carrito avisamos */
        } else if (estaEnElCarrito) {
          res.status(400).json({
            mensaje: "El producto ya esta en el carrito",
        });
    }  
}
}