import { validationResult } from "express-validator";
import rideModel from "../models/ride.model.js";
import userModel from "../models/user.model.js";
import captainModel from "../models/captain.model.js";
import { createRide } from "../services/ride.service.js";
import { getAddressCoordinates } from "./map.controller.js";
import { getCaptainInTheRadius } from "../services/maps.service.js";
import { sendMessageToSocketId } from "../../socket.js";

// Create ride and notify nearby captains via socket
async function createRideController(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { pickup, destination, vehicleType } = req.body;

    if (!pickup || !destination || !vehicleType) {
      return res
        .status(400)
        .json({ message: "Pickup, destination and vehicle type are required" });
    }

    // Get pickup coordinates first
    const pickupCoordinates = await getAddressCoordinates(pickup);
    if (
      !pickupCoordinates ||
      !pickupCoordinates.lat ||
      !pickupCoordinates.lng
    ) {
      return res
        .status(400)
        .json({ message: "Could not determine pickup location coordinates" });
    }

    // Get destination coordinates
    const destinationCoordinates = await getAddressCoordinates(destination);
    if (
      !destinationCoordinates ||
      !destinationCoordinates.lat ||
      !destinationCoordinates.lng
    ) {
      return res
        .status(400)
        .json({ message: "Could not determine destination coordinates" });
    }

    // Create the ride (status pending)
    const newRide = await createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
      pickupLocation: {
        coordinates: [pickupCoordinates.lng, pickupCoordinates.lat],
        address: pickupCoordinates.formattedAddress,
      },
      destinationLocation: {
        coordinates: [destinationCoordinates.lng, destinationCoordinates.lat],
        address: destinationCoordinates.formattedAddress,
      },
    });

    // Find nearby captains (radius in km)
    const captainsInRadius = await getCaptainInTheRadius(
      pickupCoordinates.lat,
      pickupCoordinates.lng,
      10
    );

    // Notify each captain via socket (if they have socketId)
    if (captainsInRadius && captainsInRadius.length) {
      captainsInRadius.forEach((captain) => {
        try {
          if (captain.socketId) {
            sendMessageToSocketId(captain.socketId, {
              event: "ride_request",
              data: {
                rideId: newRide._id,
                pickup: newRide.pickup,
                destination: newRide.destination,
                fare: newRide.fare,
                vehicleType: newRide.vehicleType,
              },
            });
          }
        } catch (err) {
          console.error("Error notifying captain:", err);
        }
      });
    }

    // Send the response with ride details
    return res.status(201).json({
      message: "Ride created successfully",
      ride: newRide,
      notifiedCaptains: captainsInRadius.map((c) => ({
        _id: c._id,
        socketId: c.socketId,
      })),
    });
  } catch (error) {
    console.error("Create ride error:", error);
    return res.status(500).json({
      message: error.message || "Server error",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
}

// Captain accepts a ride
async function acceptRideController(req, res) {
  try {
    const rideId = req.params.id;
    const captain = req.captain;

    const ride = await rideModel.findById(rideId);
    if (!ride) return res.status(404).json({ message: "Ride not found" });
    if (ride.status !== "pending")
      return res.status(400).json({ message: "Ride is not available" });

    ride.captain = captain._id;
    ride.status = "accepted";
    await ride.save();

    // Notify the user
    const user = await userModel.findById(ride.user);
    if (user && user.socketId) {
      sendMessageToSocketId(user.socketId, {
        event: "ride_accepted",
        data: {
          rideId: ride._id,
          captain: {
            _id: captain._id,
            name: captain.fullName,
            vehicle: captain.vehicle,
          },
        },
      });
    }

    // Notify other captains to cancel their UI for this ride
    const otherCaptains = await captainModel.find({
      _id: { $ne: captain._id },
      socketId: { $exists: true },
    });
    otherCaptains.forEach((c) => {
      if (c.socketId)
        sendMessageToSocketId(c.socketId, {
          event: "ride_taken",
          data: { rideId: ride._id },
        });
    });

    return res.status(200).json({ message: "Ride accepted", ride });
  } catch (error) {
    console.error("Accept ride error:", error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
}

// Captain starts ride
async function startRideController(req, res) {
  try {
    const rideId = req.params.id;
    const captain = req.captain;

    const ride = await rideModel.findById(rideId);
    if (!ride) return res.status(404).json({ message: "Ride not found" });
    if (!ride.captain || ride.captain.toString() !== captain._id.toString())
      return res.status(403).json({ message: "Not authorized" });
    if (ride.status !== "accepted")
      return res.status(400).json({ message: "Ride not in accepted state" });

    ride.status = "ongoing";
    await ride.save();

    // Notify user
    const user = await userModel.findById(ride.user);
    if (user && user.socketId) {
      sendMessageToSocketId(user.socketId, {
        event: "ride_started",
        data: { rideId: ride._id },
      });
    }

    // Notify captain (confirmation)
    if (captain.socketId)
      sendMessageToSocketId(captain.socketId, {
        event: "ride_started_confirmation",
        data: { rideId: ride._id },
      });

    return res.status(200).json({ message: "Ride started", ride });
  } catch (error) {
    console.error("Start ride error:", error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
}

// Captain ends ride
async function endRideController(req, res) {
  try {
    const rideId = req.params.id;
    const captain = req.captain;

    const ride = await rideModel.findById(rideId);
    if (!ride) return res.status(404).json({ message: "Ride not found" });
    if (!ride.captain || ride.captain.toString() !== captain._id.toString())
      return res.status(403).json({ message: "Not authorized" });
    if (ride.status !== "ongoing")
      return res.status(400).json({ message: "Ride not in progress" });

    ride.status = "completed";
    await ride.save();

    // Notify user
    const user = await userModel.findById(ride.user);
    if (user && user.socketId) {
      sendMessageToSocketId(user.socketId, {
        event: "ride_completed",
        data: { rideId: ride._id },
      });
    }

    // Notify captain (confirmation)
    if (captain.socketId)
      sendMessageToSocketId(captain.socketId, {
        event: "ride_completed_confirmation",
        data: { rideId: ride._id },
      });

    return res.status(200).json({ message: "Ride completed", ride });
  } catch (error) {
    console.error("End ride error:", error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
}

async function getPendingRidesForCaptain(req, res) {
  try {
    const captain = req.captain;
    if (!captain || !captain.location || !captain.location.coordinates)
      return res
        .status(400)
        .json({ message: "Captain location not available" });
    const [lng, lat] = captain.location.coordinates;
    // radius query: find pending rides whose pickup location is within 15 km
    const radiusKm = 15;
    const rides = await rideModel
      .find({
        status: "pending",
        "pickup.location": {
          $geoWithin: {
            $centerSphere: [[lng, lat], radiusKm / 6378.1],
          },
        },
      })
      .limit(50);

    return res.status(200).json({ rides });
  } catch (error) {
    console.error("Get pending rides error:", error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
}

export {
  createRideController,
  acceptRideController,
  startRideController,
  endRideController,
  getPendingRidesForCaptain,
};
