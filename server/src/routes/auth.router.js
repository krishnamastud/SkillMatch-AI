import express from "express";
import {
  getMeController,
  googleOAuthCallbackController,
  loginController,
  refreshTokenController,
  registerController,
} from "../controller/auth.controller.js";
import {
  loginValidationRules,
  registerValidationRules,
} from "../validation/auth.validation.js";
import { authenticate } from "../middleware/auth.middleware.js";
import passport from "passport";
import userModel from "../model/user.model.js";
import { generateTokens } from "../utils/auth.utils.js";

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
router.post("/register", registerValidationRules, registerController);

/**
 * @route POST /api/auth/login
 * @description Login a user
 * @access Public
 */
router.post("/login", loginValidationRules, loginController);

/**
 * @route GET /api/auth/get-me
 * @description Get the current user details
 * @access Private
 */
router.get("/get-me", authenticate, getMeController);

/**
 * @route POST /api/auth/refresh-token
 * @description Refresh the access token
 * @access Public
 */
router.post("/refresh-token", refreshTokenController);

/**
 * @route GET /api/auth/google
 * @description Initiate Google OAuth 2.0 authentication
 * @access Public
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
    session: false,
  }),
);

/*
 * @route GET /api/auth/google/callback
 * @description Handle Google OAuth 2.0 callback
 * @access Public
 */
router.get('/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: "/",
  }),
  googleOAuthCallbackController
);




export default router;
