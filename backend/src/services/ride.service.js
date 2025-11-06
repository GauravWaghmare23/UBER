import rideModel from "../models/ride.model.js";
import { getTimeDistance } from "./maps.service.js";
import crypto from 'crypto';

const VEHICLE_TYPES = {
  standard: { baseFare: 50, perKm: 15, perMin: 3 },
  premium: { baseFare: 80, perKm: 20, perMin: 4 },
  suv: { baseFare: 100, perKm: 25, perMin: 5 }
};

export const generateOtp = (digits = 6) => {
  return crypto.randomInt(Math.pow(10, digits - 1), Math.pow(10, digits)).toString();
};

export async function calculateFare(timeDistance, vehicleType = 'standard') {
  if (!timeDistance || !timeDistance.distance || !timeDistance.duration) {
    throw new Error('Invalid time/distance data');
  }
  if (!VEHICLE_TYPES[vehicleType]) {
    vehicleType = 'standard';
  }

  const { baseFare, perKm, perMin } = VEHICLE_TYPES[vehicleType];
  const distanceKm = timeDistance.distance.value / 1000;
  const durationMin = timeDistance.duration.value / 60;

  const total = Math.round(baseFare + distanceKm * perKm + durationMin * perMin);

  return {
    total,
    breakdown: { baseFare, distanceCharge: Math.round(distanceKm * perKm), timeCharge: Math.round(durationMin * perMin) },
    estimate: { distance: `${Math.round(distanceKm * 10) / 10} km`, duration: `${Math.round(durationMin)} min` }
  };
}

export const createRide = async ({ user, pickup, destination, vehicleType, pickupLocation, destinationLocation }) => {
  if (!user || !pickup || !destination || !vehicleType || !pickupLocation || !destinationLocation) {
    throw new Error('Missing required ride data');
  }

  // Get time/distance from maps service
  const timeDistance = await getTimeDistance(pickup, destination);
  const fareDetails = await calculateFare(timeDistance, vehicleType);

  const newRide = new rideModel({
    user,
    pickup: { address: pickup, location: { type: 'Point', coordinates: pickupLocation.coordinates } },
    destination: { address: destination, location: { type: 'Point', coordinates: destinationLocation.coordinates } },
    vehicleType,
    fare: fareDetails.total,
    duration: timeDistance.duration.value,
    distance: timeDistance.distance.value,
    otp: generateOtp(6)
  });

  await newRide.save();
  return newRide.toPublicJSON ? newRide.toPublicJSON() : newRide;
};

export async function updateRideStatus(rideId, update) {
  const ride = await rideModel.findByIdAndUpdate(rideId, update, { new: true });
  return ride;
};