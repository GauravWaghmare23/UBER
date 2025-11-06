
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { createUser } from "../services/user.service.js";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import blacklistTokenModel from "../models/blacklist.model.js";

async function registerUser(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { fullName: { firstName, lastName }, email, password } = req.body;

        if (!firstName || !password || !email) {
            
            return res.status(400).json({ message: "All required fields" });

        }

        const userExists = await userModel.findOne({ email });
        if (userExists) {

            return res.status(400).json({ message: "User already exists" });

        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await createUser({ firstName, lastName, email, password: hashedPassword });

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        // Set cookie with same expiry as JWT (7 days) so browser persists it
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
        });
        res.status(201).json({ message: "User created successfully", user, token });
    } catch (error) {
        res.status(500).json({ message: error.message || "Server error" });
    }
}

async function loginUser(req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }


        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
        });

        res.status(201).json({ message: "Login successful", user, token });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Server error" });
    }


}

async function userProfile(req, res) {
    const userProfile = req.user;

    const user = await userModel.findById(userProfile._id).select("-password");

    res.status(201).json({ user });
}

async function logoutUser(req, res) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(400).json({ message: "No token found to logout" });
    }

    res.clearCookie("token");

    await blacklistTokenModel.create({ token });

    res.status(201).json({ message: "Logout successful" });
}
export { registerUser, loginUser, userProfile, logoutUser };
