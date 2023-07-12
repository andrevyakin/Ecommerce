import TokenService from "../services/tokenService.js";
import UserModel from "../models/UserModel.js";
import ApiResponse from "../services/ApiResponse.js";

export default function (role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next();
        }
        try {
            const token = req.headers.authorization;
            if (!token) {
                return next(
                    ApiResponse.unauthorized(
                        "Авторизуйтесь или зарегистрируйтесь."
                    )
                );
            }
            const tokenService = new TokenService();
            const data = tokenService.validateAccess(token.split(" ")[1]);
            if (!data) {
                return next(
                    ApiResponse.unauthorized(
                        "Авторизуйтесь или зарегистрируйтесь."
                    )
                );
            }
            UserModel.findOne({ _id: data._id }).then((user) => {
                if (user.role !== role) {
                    return next(ApiResponse.forbidden("Нет доступа."));
                }
                req.user = data;
                next();
            });
        } catch (e) {
            next(
                ApiResponse.internal(
                    "На сервере произошла ошибка. Попробуйте позже."
                )
            );
        }
    };
}
