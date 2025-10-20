import express from "express";
import { body } from "express-validator";
import { captainRegister } from "../controllers/captain.controller.js";

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
        .withMessage("Password must be at least 8 characters long"),
    body("vehicle.color")
        .isLength({ min: 3 })
        .withMessage("Color must be at least 3 characters long"),
    body("vehicle.plate")
        .isLength({ min: 3 })
        .withMessage("Plate must be at least 3 characters long"),
    body("vehicle.capacity")
        .isNumeric()
        .withMessage("Capacity must be a number"),
    body("vehicle.vehicleType")
        .isIn(["car", "motorcycle", "auto"])
        .withMessage("Invalid vehicle type")
], captainRegister);

export default router;