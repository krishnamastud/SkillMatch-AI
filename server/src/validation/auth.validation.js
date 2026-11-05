import { body, validationResult } from "express-validator";



// Validation rules for User Registration
export const registerValidationRules = [
  body("username")
    .trim()
    .notEmpty().withMessage("Username is required").bail()
    .isLength({ min: 3, max: 30 }).withMessage("Username must be between 3 and 30 characters").bail()
    .matches(/^[a-zA-Z0-9_]+$/).withMessage("Username can only contain letters, numbers, and underscores"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required").bail()
    .isEmail().withMessage("Please enter a valid email address").bail()
    .normalizeEmail({ gmail_remove_dots: false }) // Normalizes email to lowercase
    .isLength({ min: 5, max: 50 }).withMessage("Email must be between 5 and 50 characters"),

  body("password")
    .notEmpty().withMessage("Password is required").bail()
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long").bail()
    .isLength({ max: 100 }).withMessage("Password cannot exceed 100 characters").bail()
    // Optional: enforce complexity
    .matches(/\d/).withMessage("Password must contain at least one number").bail()
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter"),

    (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  }
];

// Validation rules for User Login
export const loginValidationRules = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please enter a valid email address")
    .normalizeEmail({ gmail_remove_dots: false }),

  body("password")
    .notEmpty().withMessage("Password is required").bail()
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long").bail()
    .isLength({ max: 100 }).withMessage("Password cannot exceed 100 characters").bail()
    // Optional: enforce complexity
    .matches(/\d/).withMessage("Password must contain at least one number").bail()
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter"),

    (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }
    next();
  }
];