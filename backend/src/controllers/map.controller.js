import { validationResult } from "express-validator";
import {
  getAddressCoordinate,
  getAutoCompleteSuggestions,
  getTimeDistance,
} from "../services/maps.service.js";
import { getFare } from "../services/ride.service.js";

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
      res.status(400).json({ message: "All fields are required" });
    }
    const timeDistance = await getTimeDistance(origin, destination);
    const fares = await getFare(origin, destination)
    res.status(200).json({timeDistance,fares});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getSuggestion(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { input } = req.query;
  try {
    const suggestion = await getAutoCompleteSuggestions(input);
    res.status(200).json(suggestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { getCoordinates, getTheTimeDistanceFare, getSuggestion };
