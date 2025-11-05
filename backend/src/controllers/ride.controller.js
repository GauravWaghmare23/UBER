import { validationResult } from "express-validator";
import rideModel from "../models/ride.model.js";
import { createRide } from "../services/ride.service.js";

async function createRideController(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { pickup,destination,vehicleType } = req.body;
        const newRide = await createRide({ user: req.user._id, pickup, destination, vehicleType });
        res.status(201).json({ message: "Ride created successfully", newRide });
    } catch (error) {
        res.status(500).json({ message: error.message || "Server error" });
    }
}

export {createRideController};