import config from "../config/config.js"
import jwt from "jsonwebtoken"


// function which take type and user as an argument to  generate access or refresh token
export const generateTokens = (user, type) => {
    const payload = {
        id: user._id,
        email: user.email,
    }
    return jwt.sign(payload, type === "access" ? config.ACCESS_TOKEN_SECRET : config.REFRESH_TOKEN_SECRET, { expiresIn: type === "access" ? "15m" : "7d" })
}

// function which take token and type as an argument to verify access or refresh token
export const verifyToken = (token, type ) => {
    try {
        const decoded = jwt.verify(token, type === "access" ? config.ACCESS_TOKEN_SECRET : config.REFRESH_TOKEN_SECRET);
        return decoded;
    } catch (error) {
        throw new Error("Invalid token");
    }
}