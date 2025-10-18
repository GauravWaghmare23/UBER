import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.status(200).send("Hello from the backend");
});


export default app;

