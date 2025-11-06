import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import http from "http"
import { initializeSocket } from "./socket.js";

const server = http.createServer(app);
initializeSocket(server);


const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});