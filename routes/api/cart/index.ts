import { Router } from "express";
import { AddProductCartController } from "../../../controllers/AddProductCart";
import { DeleteProductController } from "../../../controllers/DeleteProduct";
import { GetProductCartController } from "../../../controllers/GetProductCart";
import { PutProductController } from "../../../controllers/PutProduct";

const router = Router()

router.get("/", GetProductCartController.get);
router.delete("/", DeleteProductController.delete);
router.put("/", PutProductController.put);
router.post("/", AddProductCartController.post);

export default router;