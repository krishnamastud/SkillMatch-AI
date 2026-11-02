import { verifyToken } from '../utils/auth.utils.js';

export const authenticate = (req, res, next) => {
    const accessToken = req.headers['authorization']?.split(' ')[1];
    if (!accessToken) {
        return res.status(401).json({
            success: false,
            message: "Access token is required",
        });
    }

    try {
        const decoded = verifyToken(accessToken, "access");
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({
            success: false,
            message: "Invalid or expired access token",
        });
    }
}