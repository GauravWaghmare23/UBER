import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectToDB from "./db/db.js"; // Your database connection logic
import userRoutes from "./routes/user.route.js";

connectToDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


//user routes 

app.use("/users", userRoutes);


export default app;