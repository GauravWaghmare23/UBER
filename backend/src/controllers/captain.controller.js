import { validationResult } from "express-validator";
import captainModel from "../models/captain.model.js";
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

        const hashedPassword = await bcrypt.hash(password, 10);

        const captain = await createCaptain({ firstName, lastName, email, password: hashedPassword, color, plate, capacity, vehicleType });

        const token = jwt.sign({ _id: captain._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        
        res.cookie("token", token, { httpOnly: true });

        res.status(201).json({ message: "Captain created successfully", captain, token });

    } catch (error) {

        return res.status(401).json({ message: error.message || "Server error" });

    }
}

export { captainRegister };