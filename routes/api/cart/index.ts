import { Router } from "express";
import { AddProductCartController } from "../../../controllers/AddProductCart";

import { GetProductCartController } from "../../../controllers/GetProductCart";
import { PutProductController } from "../../../controllers/PutProduct";

const router = Router()

router.get("/", GetProductCartController.get);

router.put("/", PutProductController.put);
router.post("/", AddProductCartController.post);

export default router;