
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { createUser } from "../services/user.service.js";
import jwt from "jsonwebtoken";

async function registerUser(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { fullName: { firstName, lastName }, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await createUser({ firstName, lastName, email, password: hashedPassword });

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, { httpOnly: true }); 
        res.status(201).json({ message: "User created successfully", user, token });
    } catch (error) {
        res.status(500).json({ message: error.message || "Server error" });
    }
}

export { registerUser };
