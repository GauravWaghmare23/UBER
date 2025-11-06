import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const config = {
    port: process.env.PORT || 4000,
    mongoUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: '24h',
    googleMapsApiKey: process.env.GOOGLE_MAPS_API,
    environment: process.env.NODE_ENV || 'development',
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
};

// Validation
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET', 'GOOGLE_MAPS_API'];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Environment variable ${envVar} is required`);
    }
}

export default config;