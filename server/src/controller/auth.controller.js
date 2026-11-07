import bcrypt from "bcryptjs";
import userModel from "../model/user.model.js";
import { generateTokens, verifyToken } from "../utils/auth.utils.js";
import { redis } from "../config/redis.js";

/**
 * Register Controller
 */
export const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  const isUserExists = await userModel.findOne({ email });

  if (isUserExists) {
    return res.status(400).json({
      success: false,
      message: "User already exists with this email",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new userModel({
    username,
    email,
    password: hashedPassword,
  });

  const accessToken = generateTokens(newUser, "access");
  const refreshToken = generateTokens(newUser, "refresh");

  newUser.refreshToken = refreshToken;
  await newUser.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    },
    accessToken,
  });
};

/**
 * Login Controller
 */
export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const accessToken = generateTokens(user, "access");
  const refreshToken = generateTokens(user, "refresh");

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    },
    accessToken,
  });
};

/**
 * Get Me Controller
 */
export const getMeController = async (req, res) => {
  const id = req.user.id;

  const user = await userModel.findById(id).select("-password -refreshToken");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    data: {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    },
  });
};

/**
 * refresh Token Controller
 */
export const refreshTokenController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "Refresh token is required",
    });
  }
  // Check if the refresh token is blacklisted in Redis
  const isRefreshTokenBlacklisted = await redis.get(`blacklist:${refreshToken}`);

  if (isRefreshTokenBlacklisted) {
    return res.status(403).json({
      success: false,
      message: "Refresh token is blacklisted",
    });
  }

  const decoded = verifyToken(refreshToken, "refresh");

  const user = await userModel.findOne({
    _id: decoded.id,
    email: decoded.email,
  });

  if (!user) {
    return res.status(403).json({
      success: false,
      message: "Invalid refresh token",
    });
  }

  if (user.refreshToken !== refreshToken) {
    user.refreshToken = null;
    await user.save();
    return res.status(403).json({
      success: false,
      message: "invalid credentials",
    });
  }

  const newAccessToken = generateTokens(user, "access");
  const newRefreshToken = generateTokens(user, "refresh");

  user.refreshToken = newRefreshToken;
  await user.save();

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Access token refreshed successfully",
    data: {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    },
    accessToken: newAccessToken,
  });
};

/**
 * Google OAuth 2.0 Callback Controller
 */
export const googleOAuthCallbackController = async (req, res) => {
  const user = req.user;
  const email = user.emails[0].value;

  const isUserExist = await userModel.findOne({ email });

  if (isUserExist) {
    // User exists, proceed with login
    const refreshToken = generateTokens(isUserExist, "refresh");
    await userModel.findByIdAndUpdate(isUserExist._id, { refreshToken });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });
    return res.redirect("http://localhost:5173/dashboard?googleLogin=success");
  }

  // User does not exist, create a new user
  const newUser = await userModel.create({
    googleId: user.id,
    email: email,
    username: user.displayName,
  });

  const refreshToken = generateTokens(newUser, "refresh");
  await userModel.findByIdAndUpdate(newUser._id, { refreshToken });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });
  return res.redirect("http://localhost:5173/dashboard?googleLogin=success");
};

/**
 * Logout Controller
 * @description Logout the current user and blacklist the refresh token in Redis
 * @access Public
 */
export const logoutController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(200).json({
      success: true,
      message: "User already logged out",
    });
  }

  const user = await userModel.findOne({
    refreshToken,
  });

  if (user) {
    // Blacklist refresh token until its normal expiry
    await redis.set(
      `blacklist:${refreshToken}`,
      "true",
      "EX",
      7 * 24 * 60 * 60
    );

    user.refreshToken = null;
    await user.save();
  }

  res.clearCookie("refreshToken");

  return res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};