import { Router } from "express";
import { check } from "express-validator";
import authController from "../controllers/authController.js";

const router = new Router();
router.post("/registration", [
    check("email", "Некорректный email").isEmail(),
    check("password", "Минимальная длина пароля 5 символов").isLength({
        min: 5
    }),
    authController.registration
]);
router.post("/login", [
    check("email", "Некорректный email").normalizeEmail().isEmail(),
    check("password", "Пароль не может быть пустым").exists(),
    authController.login
]);
router.get("/token", authController.token);

export default router;
