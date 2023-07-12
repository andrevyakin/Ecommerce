import { Router } from "express";
import auth from "../middleware/authMiddleware.js";
import userController from "../controllers/userController.js";

const router = new Router();
router.patch("/cart", auth("user"), userController.cart);
export default router;
