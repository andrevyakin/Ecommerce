import { Router } from "express";
import auth from "../middleware/authMiddleware.js";
import userController from "../controllers/userController.js";
import { check } from "express-validator";

const router = new Router();

router.post("/logout", auth("user"), userController.logout);
router
    .route("/profile")
    .get(auth("user"), userController.getUserProfile)
    .put(auth("user"), [
        check("email", "Некорректный email").isEmail(),
        check("password", "Минимальная длина пароля 5 символов").isLength({
            min: 5
        }),
        userController.updateUserProfile
    ]);
router.patch("/cart", auth("user"), userController.cart);

export default router;
