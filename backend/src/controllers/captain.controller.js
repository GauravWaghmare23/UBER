import { validationResult } from "express-validator";
import captainModel from "../models/captain.model.js";
import blacklistTokenModel from "../models/blacklist.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createCaptain } from "../services/captain.service.js";

async function captainRegister(req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullName: { firstName, lastName }, email, password, vehicle: { color, plate, capacity, vehicleType } } = req.body;

        if (!firstName || !password || !email || !color || !plate || !capacity || !vehicleType) {

            return res.status(400).json({ message: "All fields are required" });
        }

        const captainExists = await captainModel.findOne({ email });
        if (captainExists) {


            return res.status(400).json({ message: "Captain already exists" });

        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const captain = await createCaptain({ firstName, lastName, email, password: hashedPassword, color, plate, capacity, vehicleType });

        const token = jwt.sign({ _id: captain._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // Set cookie to persist for 7 days matching JWT expiry
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
        });

        res.status(201).json({ message: "Captain created successfully", captain, token });

    } catch (error) {

        return res.status(401).json({ message: error.message || "Server error" });

    }
}

async function loginCaptain(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
    
        if (!email || !password) {
    
            return res.status(400).json({ message: "All fields are required" });
        }
    
        const captain = await captainModel.findOne({ email }).select("+password");
    
        if (!captain) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
    
        const isPasswordValid = await bcrypt.compare(password, captain.password);
    
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
    
        const token = jwt.sign({ _id: captain._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
        });
    
        res.status(201).json({ message: "Login successful", captain, token });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Server error" });
    }
}

async function getCaptain(req, res) {
    const captainProfile = req.captain;

    const captain = await captainModel.findById(captainProfile._id).select("-password");

    res.status(201).json({ captain });
}

async function logoutCaptain(req, res) {

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(400).json({ message: "No token found to logout" });
    }

    res.clearCookie("token");

    await blacklistTokenModel.create({ token });

    res.status(201).json({ message: "Logout successful" });
}

export { captainRegister, loginCaptain, getCaptain, logoutCaptain };