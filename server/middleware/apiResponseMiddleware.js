import ApiResponse from "../services/ApiResponse.js";

export default function (err, req, res, next) {
    if (err instanceof ApiResponse) {
        return res.status(err.status).json({ message: err.message });
    }
    return res.status(500).json({ message: "Внутренняя ошибка сервера." });
}
