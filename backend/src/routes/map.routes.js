import { authUserMiddleware } from "../middlewares/auth.middleware.js";
import {
  getCoordinates,
  getSuggestion,
  getTheTimeDistanceFare,
} from "../controllers/map.controller.js";
import express from "express";
import { query } from "express-validator";

const router = express.Router();

router.get(
  "/get-coordinates",
  query("address")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Address must be at least 3 characters long"),
  authUserMiddleware,
  getCoordinates
);

router.get(
  "/get-distance-time-fare",
  query("origin")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Origin must be at least 3 characters long"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Destination must be at least 3 characters long"),
  authUserMiddleware,
  getTheTimeDistanceFare
);

router.get(
  "/get-suggestions",
  query("input")
    .isString()
    .isLength({ min: 1 })
    .withMessage("Input must be at least 1 characters long"),
  authUserMiddleware,
  getSuggestion
);

export default router;
