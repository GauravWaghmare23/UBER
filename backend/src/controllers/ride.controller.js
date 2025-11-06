import { validationResult } from "express-validator";
import rideModel from "../models/ride.model.js";
import { createRide } from "../services/ride.service.js";
import { getAddressCoordinates } from "./map.controller.js";
import { getCaptainInTheRadius } from "../services/maps.service.js";

async function createRideController(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { pickup, destination, vehicleType } = req.body;
        
        if (!pickup || !destination || !vehicleType) {
            return res.status(400).json({ message: "Pickup, destination and vehicle type are required" });
        }

        // Get pickup coordinates first
        const pickupCoordinates = await getAddressCoordinates(pickup);
        if (!pickupCoordinates || !pickupCoordinates.lat || !pickupCoordinates.lng) {
            return res.status(400).json({ message: "Could not determine pickup location coordinates" });
        }

        // Get destination coordinates
        const destinationCoordinates = await getAddressCoordinates(destination);
        if (!destinationCoordinates || !destinationCoordinates.lat || !destinationCoordinates.lng) {
            return res.status(400).json({ message: "Could not determine destination coordinates" });
        }

        // Find nearby captains
        const captainsInRadius = await getCaptainInTheRadius(pickupCoordinates.lat, pickupCoordinates.lng, 10);
        if (!captainsInRadius || captainsInRadius.length === 0) {
            return res.status(404).json({ message: "No captains available in your area" });
        }

        // Create the ride
        const newRide = await createRide({ 
            user: req.user._id, 
            pickup, 
            destination, 
            vehicleType,
            pickupCoordinates: {
                lat: pickupCoordinates.lat,
                lng: pickupCoordinates.lng
            },
            destinationCoordinates: {
                lat: destinationCoordinates.lat,
                lng: destinationCoordinates.lng
            }
        });

        // Send the response with both ride and available captains
        return res.status(201).json({ 
            message: "Ride created successfully", 
            ride: newRide,
            availableCaptains: captainsInRadius
        });

    } catch (error) {
        console.error('Create ride error:', error);
        return res.status(500).json({ 
            message: error.message || "Server error",
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}

export {createRideController};