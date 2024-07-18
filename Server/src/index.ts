import express from "express";
import { join } from 'node:path';
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";

// Main Router
import ApplictionRouter from "./modules";

// Const
import { SERVERPORT } from "./constants";

const SteamServer = express();
const httpServer = createServer(SteamServer);
const io = new SocketIOServer(httpServer);

SteamServer.use(express.json());
SteamServer.disable("x-powered-by");

SteamServer.use("/api", ApplictionRouter);

SteamServer.get("/chat", (req, res) => {
    res.sendFile(join(__dirname, '../src/index.html'));
});

// Configuración de Socket.IO
const Websocket = io.of("/chat")
Websocket.on("connection", (socket) => {
    console.log('a user connected to /chat');
    socket.on('disconnect', () => {
        console.log('user disconnected from /chat');
    });

    socket.on('chat message', (msg) => {
        Websocket.emit('chat message', msg);
    });
});

httpServer.listen(SERVERPORT, () => {
    console.log(`Steam Server Up on: http://localhost:${SERVERPORT}`);
});
