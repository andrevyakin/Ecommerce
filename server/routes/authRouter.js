import { Router } from "express";
import { check } from "express-validator";
import authController from "../controllers/authController.js";

const router = new Router();
router.post("/signUp", [
    check("email", "Некорректный email").isEmail(),
    check("password", "Минимальная длина пароля 8 символов").isLength({
        min: 8
    }),
    authController.signUp
]);
router.post("/signInWithPassword", [
    check("email", "Некорректный email").normalizeEmail().isEmail(),
    check("password", "Пароль не может быть пустым").exists(),
    authController.signInWithPassword
]);
router.post("/token", authController.token);

export default router;
