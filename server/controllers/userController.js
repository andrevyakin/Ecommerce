import UserModel from "../models/UserModel.js";
import ApiResponse from "../services/ApiResponse.js";

const userController = {
    cart: async (req, res, next) => {
        try {
            await UserModel.findOneAndUpdate(
                { _id: req.user.id },
                {
                    cart: req.body.cart
                }
            );

            return next(ApiResponse.created("Добавлено в корзину."));
        } catch (err) {
            return next(
                ApiResponse.internal(
                    "На сервере произошла ошибка. Попробуйте позже."
                )
            );
        }
    }
};
export default userController;
