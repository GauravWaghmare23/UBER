import { Server } from "socket.io";
import userModel from "./src/models/user.model.js";
import captainModel from "./src/models/captain.model.js";

let io;

function initializeSocket(server) {
    // Use Server (Server-side Socket.IO) rather than Socket
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: [ 'GET', 'POST' ]
        }
    });

    io.on('connect', (socket) => {
        console.log(`Client connected: ${socket.id}`);


        socket.on('join', async (data) => {
            console.log('Join event received :'+data.userId);
            try {
                const { userId, userType } = data || {};
                if (!userId || !userType) return;

                if (userType === 'user') {
                    console.log('Join event received from user :'+data.userId);
                    await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
                } else if (userType === 'captain') {
                    console.log('Join event received from captain :'+data.userId);
                    await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
                }
            } catch (err) {
                console.error('Error in join handler:', err);
            }
        });


        socket.on('update-location-captain', async (data) => {
            try {
                const { userId, location } = data || {};
                if (!userId || !location || (location.ltd === undefined) || (location.lng === undefined)) {
                    return socket.emit('error', { message: 'Invalid location data' });
                }

                await captainModel.findByIdAndUpdate(userId, {
                    location: {
                        ltd: location.ltd,
                        lng: location.lng
                    }
                });
            } catch (err) {
                console.error('Error in update-location-captain handler:', err);
            }
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

const sendMessageToSocketId = (socketId, messageObject) => {
    try {
        if (!messageObject || !messageObject.event) return;
        if (io) {
            io.to(socketId).emit(messageObject.event, messageObject.data);
        } else {
            console.log('Socket.io not initialized.');
        }
    } catch (err) {
        console.error('Error sending message to socket:', err);
    }
};

export { initializeSocket, sendMessageToSocketId };