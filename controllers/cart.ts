import { Request, Response } from "express";
import { CartModel } from "../models/cart";
import { ProductModel } from "../models/product";


export const cartController = {
    post: async (req:Request, res:Response) => {

        /*desarmamos el producto*/
        const { product } = req.body;
        const { cart } = req.body;

        /* Nos fijamos si tenemos el producto (MAURO)*/
        const estaEnProducts = await product.findOne(product.name);
      
        /* Nos fijamos si todos los campos vienen con info */
        const noEstaVacio = product.name !== "" && product.precio !== "";
      
        /* Nos fijamos si el producto ya esta en el carrito(MAURO) */
        const estaEnElCarrito = await CartModel.findOne(cart.name);
      
        /* Si no tenemos el producto */
        if (!estaEnProducts) {
          res.status(400).json({
            mensaje: "Este producto no se encuentra en el carrito",
          });
      
          /* Si nos envian algo y no esta en el carrito lo agregamos */
        } else if (noEstaVacio && !estaEnElCarrito) {
          const newProductInCart = new cart.body({name, precio, cantidad: 1 });
      
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
},
    get: async (req:Request, res:Response) => {
        const productsCart = await CartModel.find();
      
        /* si hay productos en el carritov los devolvemos*/
        if (productsCart) {
          res.json({ productsCart });
        } else {
          res.json({ mensaje: "No hay productos en el carrito" });
        }
      },
    put: async (req:Request, res:Response) => {
        const { productId } = req.params;
        const { query } = req.query;
        const body = req.body;
      
        /* Buscamos el producto en el carrito */
        const productBuscado = await CartModel.findById(productId);
      
        /* Si no hay query 'add' o 'del' */
        if (!query) {
          res.status(404).json({ mensaje: "Debes enviar una query" });
      
          /* Si esta el producto en el carrito y quiero agregar */
        } else if (productBuscado && query === "add") {
          body.cantidad = body.cantidad + 1;
      
          /* Actualizamos el producto con su cantidad nueva*/
          await CartModel.findByIdAndUpdate(productId, body, {
            new: true,
          }).then((product) => {
            res.json({
              mensaje: `El producto: ${ProductModel.name} fue actualizado`,
              product,
            });
          });
      
          /* Si esta el producto en el carrito y quiero sacar */
        } else if (productBuscado && query === "del") {
          body.cantidad = body.cantidad - 1;
         /* Actualizamos el producto*/
          await CartModel.findByIdAndUpdate(productId, body, {
            new: true,
          }).then((product) =>
            res.json({
              mensaje: `El producto: ${ProductModel.name} fue actualizado`,
              product,
            })
          );
        } else {
          res.status(400).json({ mensaje: "Ocurrio un error" });
        }
    },
   
}

