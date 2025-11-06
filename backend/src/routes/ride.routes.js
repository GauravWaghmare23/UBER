import express from "express";
const router = express.Router();
import { body } from "express-validator";
import {
  createRideController,
  acceptRideController,
  startRideController,
  endRideController,
} from "../controllers/ride.controller.js";
import {
  authUserMiddleware,
  authCaptainMiddleware,
} from "../middlewares/auth.middleware.js";

router.post(
  "/create",
  authUserMiddleware,
  [
    body("pickup")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Pickup must be at least 3 characters long"),
    body("destination")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Destination must be at least 3 characters long"),
    body("vehicleType")
      .isString()
      .isIn(["auto", "car", "motorcycle", "standard", "premium", "suv"])
      .withMessage("Invalid vehicle type"),
  ],
  createRideController
);

// Captain accepts a ride
router.post("/:id/accept", authCaptainMiddleware, acceptRideController);

// Captain marks ride as started
router.post("/:id/start", authCaptainMiddleware, startRideController);

// Captain marks ride as completed
router.post("/:id/end", authCaptainMiddleware, endRideController);

// Captain fetches pending rides near them
router.get("/pending/nearby", authCaptainMiddleware, getPendingRidesForCaptain);

export default router;
