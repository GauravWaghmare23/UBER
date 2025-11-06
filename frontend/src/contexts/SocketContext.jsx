/* eslint-disable react-refresh/only-export-components */
import { createContext,useEffect } from "react";
import {io} from "socket.io-client";

export const socketContext = createContext();

const socket = io(`${import.meta.env.VITE_API_URL}`);


const SocketProvider = ({children}) =>{
    useEffect(() => {
        const onConnect = () => {
            console.log("Connected to server");
        };

        const onDisconnect = () => {
            console.log('Disconnected from server');
        };

        const onError = (error) => {
            console.error('Socket error:', error);
        };

        socket.on("connect", onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('error', onError);

        return () => {
            socket.off("connect", onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('error', onError);
        };
    }, []);

    return (
        <socketContext.Provider value={{ socket }}>
            {children}
        </socketContext.Provider>
    );
}

export {SocketProvider};