import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const getAddressCoordinate = async(address) => {

    const GOOGLE_MAPS_API = process.env.GOOGLE_MAPS_API;

    try {
        if (!GOOGLE_MAPS_API) {
            throw new Error('Google Maps API key is not configured');
        }else{
            console.log("Google Maps API key is configured");
        }

        const encodedAddress = encodeURIComponent(address);
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_MAPS_API}`;

        const response = await axios.get(url);

        if (response.data.status === 'OK' && response.data.results.length > 0) {
            const location = response.data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng,
                formattedAddress: response.data.results[0].formatted_address
            };
        } else {
            throw new Error('No coordinates found for the given address');
        }
    } catch (error) {
        if (error.response) {
            // Google Maps API error
            throw new Error(`Geocoding failed: ${error.response.data.error_message || error.response.data.status}`);
        }
        throw error;
    }
}

export const getTimeDistance = async (origin, destination) => {

    const GOOGLE_MAPS_API = process.env.GOOGLE_MAPS_API;

    try {
        if (!GOOGLE_MAPS_API) {
            throw new Error('Google Maps API key is not configured');
        }else{
            console.log("Google Maps API key is configured");
        }

        const encodedOrigin = encodeURIComponent(origin);
        const encodedDestination = encodeURIComponent(destination);
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodedOrigin}&destinations=${encodedDestination}&key=${GOOGLE_MAPS_API}`;

        const response = await axios.get(url);    

        if (response.data.status === 'OK' && response.data.rows.length > 0 && response.data.rows[0].elements.length > 0) {
            return response.data.rows[0].elements[0];
        } else {
            throw new Error('No distance or duration found for the given addresses');
        }
    } catch (error) {
        if (error.response) {
            // Google Maps API error
            throw new Error(`Geocoding failed: ${error.response.data.error_message || error.response.data.status}`);
        }
        throw error;
    }
}

export const getAutoCompleteSuggestions =async(input)=>{
    if (!input) {
        throw new Error `the input is empty`;
    }
    const GOOGLE_MAPS_API = process.env.GOOGLE_MAPS_API;
    try {
        if (!GOOGLE_MAPS_API) {
            throw new Error('Google Maps API key is not configured');
        }else{
            console.log("Google Maps API key is configured");
        }

        const encodedInput = encodeURIComponent(input);
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodedInput}&key=${GOOGLE_MAPS_API}`;

        const response = await axios.get(url);    
        if (response.data.status === 'OK' && response.data.predictions.length > 0) {
            return response.data.predictions;
        } else {
            throw new Error('No suggestions found for the given input');
        }
    } catch (error) {
        if (error.response) {
            throw new Error(`Geocoding failed: ${error.response.data.error_message || error.response.data.status}`);
        }
        throw error;
    }
}