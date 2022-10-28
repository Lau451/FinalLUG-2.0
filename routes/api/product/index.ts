import { Router } from "express";
import { ProductController } from "../../../controllers/product";

const router = Router();

router.get("/", ProductController.get);

export default router;

