import express from "express";
const router = express.Router();
import { body } from "express-validator";
import { createRideController } from "../controllers/ride.controller.js";
import { authUserMiddleware } from "../middlewares/auth.middleware.js";

router.post(
  "/create",
  authUserMiddleware,
  [
    body("pickup")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Destination must be at least 3 characters long"),
    body("destination")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Date must be at least 3 characters long"),
    body("vehicleType")
      .isString()
      .isIn(["auto", "car", "motorcycle"])
      .withMessage("Invalid vehicle type"),
  ],
  createRideController
);

export default router;
