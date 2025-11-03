import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectToDB from "./db/db.js"; // Your database connection logic
import userRoutes from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import captainRoutes from "./routes/captain.route.js";
import mapRoutes from "./routes/map.routes.js";

connectToDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true               
}))
app.use(cookieParser());


//user routes 

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
app.use("/maps",mapRoutes);


export default app;