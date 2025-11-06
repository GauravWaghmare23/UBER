import { validationResult } from "express-validator";
import {
  getAddressCoordinate,
  getAutoCompleteSuggestions,
  getTimeDistance,
} from "../services/maps.service.js";
import { calculateFare } from "../services/ride.service.js";

// Function to get coordinates from an address string
export async function getAddressCoordinates(address) {
  try {
    return await getAddressCoordinate(address);
  } catch (error) {
    throw new Error(`Failed to get coordinates: ${error.message}`);
  }
}

// Controller function for the API endpoint
async function getCoordinates(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { address } = req.query;
    if (!address) {
      return res.status(400).json({ message: "Address is required" });
    }

    const coordinates = await getAddressCoordinate(address);
    return res.status(200).json(coordinates);
  } catch (error) {
    console.error('Get coordinates error:', error);
    return res.status(500).json({ error: error.message });
  }
}

async function getTheTimeDistanceFare(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { origin, destination } = req.query;
  try {
    if (!origin || !destination) {
      return res.status(400).json({ message: "Origin and destination are required" });
    }

    const timeDistance = await getTimeDistance(origin, destination);
    if (!timeDistance) return res.status(400).json({ message: 'Could not calculate time/distance' });

    // Provide fare estimates for supported vehicle types
    const vehicleTypes = ['standard','premium','suv'];
    const fares = {};
    for (const vt of vehicleTypes) {
      fares[vt] = await calculateFare(timeDistance, vt);
    }

    return res.status(200).json({ timeDistance, fares });
  } catch (error) {
    console.error('Get time-distance-fare error:', error);
    return res.status(500).json({ error: error.message });
  }
}

async function getSuggestion(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { input } = req.query;
  try {
    if (!input) return res.status(400).json({ message: 'Input is required' });
    const suggestion = await getAutoCompleteSuggestions(input);
    return res.status(200).json(suggestion);
  } catch (error) {
    console.error('Get suggestions error:', error);
    return res.status(500).json({ error: error.message });
  }
}

export { getCoordinates, getTheTimeDistanceFare, getSuggestion };
