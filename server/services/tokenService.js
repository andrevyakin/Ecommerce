import jwt from "jsonwebtoken";
import TokenModel from "../models/TokenModel.js";

class TokenService {
    generate(payload) {
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1h"
        });
        const refreshToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_SECRET
        );
        return { accessToken, refreshToken, expiresIn: 3600 };
    }

    async save(user, refreshToken) {
        const data = await TokenModel.findOne({ user });
        if (data) {
            data.refreshToken = refreshToken;
            return data.save();
        }

        return await TokenModel.create({ user, refreshToken });
    }

    validateRefresh(refreshToken) {
        try {
            return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        } catch (e) {
            return null;
        }
    }

    validateAccess(accessToken) {
        try {
            return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        } catch (e) {
            return null;
        }
    }

    async findToken(refreshToken) {
        try {
            return await TokenModel.findOne({ refreshToken });
        } catch (e) {
            return null;
        }
    }
}

export default TokenService;
