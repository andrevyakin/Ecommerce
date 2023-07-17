import UserModel from "../models/UserModel.js";
import ApiResponse from "../services/ApiResponse.js";
import bcrypt from "bcrypt";
import authValidation from "../services/authValidation.js";
import TokenService from "../services/tokenService.js";

const userController = {
    logout: async (req, res, next) => {
        try {
            res.cookie("jwt", "", {
                httpOnly: true,
                expires: new Date(0)
            });
            next(ApiResponse.ok("Успешный выход из системы."));
        } catch (e) {
            next(
                ApiResponse.internal(
                    "На сервере произошла ошибка. Попробуйте позже."
                )
            );
        }
    },

    getUserProfile: async (req, res, next) => {
        try {
            const user = await UserModel.findById(req.user._id);
            if (user) {
                res.status(200).send({ user });

            } else {
                return next(ApiResponse.notFound("Пользователь не найден."));
            }
        } catch (e) {
            return next(
                ApiResponse.internal(
                    "На сервере произошла ошибка. Попробуйте позже."
                )
            );
        }
    },

    updateUserProfile: async (req, res, next) => {
        try {
            if (!authValidation(req, res)) return;
            const user = await UserModel.findById(req.user._id);

            if (user) {
                user.name = req.body.name || user.name;
                user.email = req.body.email || user.email;

                if (req.body.password) {
                    user.password  = await bcrypt.hash(req.body.password, 12);
                }

                const updatedUser = await user.save();

                const tokenService = new TokenService();
                const tokens = tokenService.generate({ _id: updatedUser._id });
                await tokenService.save(updatedUser._id, tokens.refreshToken);

                res.status(200).send({ user: updatedUser, ...tokens });
            } else {
                return next(ApiResponse.notFound("Пользователь не найден."));
            }
        } catch (e) {
            return next(
                ApiResponse.internal(
                    "На сервере произошла ошибка. Попробуйте позже."
                )
            );
        }
    },

    cart: async (req, res, next) => {
        try {
            await UserModel.findOneAndUpdate(
                { _id: req.user.id },
                {
                    cart: req.body.cart
                }
            );

            return next(ApiResponse.created("Добавлено в корзину."));
        } catch (e) {
            return next(
                ApiResponse.internal(
                    "На сервере произошла ошибка. Попробуйте позже."
                )
            );
        }
    }
};
export default userController;
