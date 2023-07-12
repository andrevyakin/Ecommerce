import { Router } from "express";
import categoryController from "../controllers/categoryController.js";
import auth from "../middleware/authMiddleware.js";

const router = new Router();
router
    .route("/")
    .get(auth("admin"), categoryController.getCategories)
    .post(auth("admin"), categoryController.createCategory);

router
    .route("/:id")
    .delete(auth("admin"), categoryController.deleteCategory)
    .put(auth("admin"), categoryController.updateCategory);

export default router;
