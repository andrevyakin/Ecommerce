import { Router } from "express";
import categoryRouter from "./categoryRouter.js";
import productRouter from "./productRouter.js";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
const router = new Router();

router.use("/category", categoryRouter);
router.use("/product", productRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);

export default router;
