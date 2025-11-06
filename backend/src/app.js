import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectToDB from "./db/db.js"; // Your database connection logic
import userRoutes from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import captainRoutes from "./routes/captain.route.js";
import mapRoutes from "./routes/map.routes.js";
import rideRoutes from "./routes/ride.routes.js"

connectToDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'https://p62j62jw-5173.inc1.devtunnels.ms',
    credentials: true               
}))
app.use(cookieParser());


//user routes 

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
app.use("/maps",mapRoutes);
app.use("/rides",rideRoutes);

export default app;