import { Router } from "express";
import { cartController } from "../../../controllers/cart";

const router = Router()

router.get("/", cartController.get);
router.delete("/", cartController.put);
router.put("/", cartController.put);

export default router;