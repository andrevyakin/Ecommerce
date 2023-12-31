import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";
import TokenService from "../services/tokenService.js";
import ApiResponse from "../services/ApiResponse.js";
import authValidation from "../services/authValidation.js";

const authController = {
    registration: async (req, res, next) => {
        try {
            if (!authValidation(req, res)) return;
            const { name, email, password } = req.body;

            const exitingUser = await UserModel.findOne({ email });

            if (exitingUser) {
                return next(
                    ApiResponse.unprocessable(
                        "Пользователь с таким Email уже зарегистрирован."
                    )
                );
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const newUser = await UserModel.create({
                ...req.body,
                password: hashedPassword
            });

            const tokenService = new TokenService();
            const tokens = tokenService.generate({ _id: newUser._id });
            await tokenService.save(newUser._id, tokens.refreshToken);

            res.status(201).send({ user: newUser, ...tokens });
        } catch (e) {
            next(
                ApiResponse.internal(
                    "На сервере произошла ошибка. Попробуйте позже."
                )
            );
        }
    },

    login: async (req, res, next) => {
        try {
            if (!authValidation(req, res)) return;
            const { email, password } = req.body;

            const existingUser = await UserModel.findOne({ email });

            if (!existingUser) {
                return next(
                    ApiResponse.unauthorized("Некорректный логин или пароль.")
                );
            }

            const isPasswordEqual = await bcrypt.compare(
                password,
                existingUser.password
            );

            if (!isPasswordEqual) {
                return next(
                    ApiResponse.unauthorized("Некорректный логин или пароль.")
                );
            }

            const tokenService = new TokenService();
            const tokens = tokenService.generate({ _id: existingUser._id });
            await tokenService.save(existingUser._id, tokens.refreshToken);

            res.status(200).send({ user: existingUser, ...tokens });
        } catch (e) {
            next(
                ApiResponse.internal(
                    "На сервере произошла ошибка. Попробуйте позже."
                )
            );
        }
    },

    token: async (req, res, next) => {
        try {
            const { refresh_token: refreshToken } = req.body;
            const tokenService = new TokenService();
            const data = tokenService.validateRefresh(refreshToken);
            const dbToken = await tokenService.findToken(refreshToken);

            function isTokenInvalid(data, dbToken) {
                return (
                    !data || !dbToken || data._id !== dbToken?.user?.toString()
                );
            }
            if (isTokenInvalid(data, dbToken)) {
                return next(
                    ApiResponse.unauthorized("Пользователь не авторизован.")
                );
            }

            const tokens = tokenService.generate({
                _id: data._id
            });
            await tokenService.save(data._id, tokens.refreshToken);

            res.status(200).send({ ...tokens, userId: data._id });
        } catch (e) {
            next(
                ApiResponse.internal(
                    "На сервере произошла ошибка. Попробуйте позже."
                )
            );
        }
    }
};

export default authController;
