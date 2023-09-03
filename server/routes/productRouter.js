import { Router } from "express";
import ProductController from "../controllers/productController.js";
import auth from "../middleware/authMiddleware.js";

const router = new Router();
router
    .route("/")
    .get(ProductController.getProducts)
    .post(auth("admin"), ProductController.createProduct);
router.route("/edit").put(auth("admin"),ProductController.updateProduct);

router
    .route("/:id")
    .delete(auth("admin"), ProductController.deleteProduct);

export default router;
