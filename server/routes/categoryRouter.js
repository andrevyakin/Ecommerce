import { Router } from "express";
import categoryController from "../controllers/categoryController.js";
import auth from "../middleware/authMiddleware.js";

const router = new Router();
router
    .route("/")
    .get(categoryController.getCategories)
    .post(auth("admin"), categoryController.createCategory);

router
    .route("/:id")
    .get(categoryController.getCategoryById)
    .delete(auth("admin"), categoryController.deleteCategory)
    .put(auth("admin"), categoryController.updateCategory);

router.route("/products/:id").get(categoryController.getAllProductsByCategory);

export default router;
