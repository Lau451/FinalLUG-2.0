import { Router } from "express";
import { GetProductController } from "../../../controllers/GetProduct";
import { AddProductController } from "../../../controllers/AddProduct";

const router = Router();

router.get("/", GetProductController.get);

router.post("/", AddProductController.post);

export default router;

