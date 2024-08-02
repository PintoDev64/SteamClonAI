import express from "express";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { join } from "node:path";
import cors from 'cors'
import cookieParser from 'cookie-parser'
// Main Router
import ApplictionRouter from "./modules";

// Const
import { SERVERPORT } from "./constants";

// Websockets
import ChatWebsocket from "./modules/chats";

// Websockets Middleware
import checkChatIdentification from "./modules/chats/middleware";

const SteamServer = express();
const httpServer = createServer(SteamServer);
const io = new SocketIOServer(httpServer);

const URL_WhiteList = ["http://localhost:5173", "https://steam-clon-ai-web.vercel.app"]

SteamServer.use(cookieParser());
SteamServer.use(express.json());
SteamServer.use(cors({
    origin: process.env.NODE_ENV === "production" ? "https://steam-clon-ai-web.vercel.app/" : "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200
}))
SteamServer.disable("x-powered-by");

SteamServer.use("/api", ApplictionRouter);

SteamServer.get("/chat1", (req, res) => {
    res.sendFile(join(__dirname, '../src/chat1.html'));
});
SteamServer.get("/chat2", (req, res) => {
    res.sendFile(join(__dirname, '../src/chat2.html'));
});

SteamServer.use((req, res, next) => {
    // Redirige a la ruta principal si la ruta no está definida
    res.redirect('/api/v1/game?idGame=e8463af1-f89d-4746-a791-573949ead507');
});

// ------------> Socket.IO Config - "/chat"
const Websocket = io.of("/chat")
Websocket.use(checkChatIdentification)
Websocket.on("connection", ChatWebsocket);

// ------------> Socket.IO Config - "/notifications"

// Server Listing
httpServer.listen(SERVERPORT, () => {
    console.log(`Steam Server Up on: http://localhost:${SERVERPORT}`);
});
