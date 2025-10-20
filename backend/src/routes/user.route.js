import express from "express";
import { body } from "express-validator";
import { loginUser, logoutUser, registerUser, userProfile } from "../controllers/user.controller.js";
import { authUserMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", [
    body("fullName.firstName")
        .isLength({ min: 3 })
        .withMessage("First name must be at least 3 characters long"),
    body("fullName.lastName")
        .isLength({ min: 3 })
        .withMessage("Last name must be at least 3 characters long"),
    body("email")
        .isEmail()
        .withMessage("Invalid email"),
    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
], registerUser);

router.post("/login", [
    body("email")
        .isEmail()
        .withMessage("Invalid email"),
    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
],loginUser)

router.get("/profile", authUserMiddleware, userProfile);

router.get("/logout",authUserMiddleware,logoutUser)


export default router;
