import express from "express";
import {
  getMeController,
  loginController,
  refreshTokenController,
  registerController,
} from "../controller/auth.controller.js";
import {
  loginValidationRules,
  registerValidationRules,
} from "../validation/auth.validation.js";
import { authenticate } from "../middleware/auth.middleware.js";

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

export default router;
