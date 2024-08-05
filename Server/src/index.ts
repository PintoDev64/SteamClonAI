import express from "express";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { join } from "node:path";
import cors from 'cors'
import cookieParser from 'cookie-parser'
// Main Router
import ApplictionRouter from "./modules";

// Const
import { CORS_AUTH, SERVERPORT } from "./constants";

// Websockets
import StatusWebsocket from "./modules/status";

// Websockets Middleware
import checkIdentification from "./modules/status/middleware";

const SteamServer = express();
const httpServer = createServer(SteamServer);
const io = new SocketIOServer(httpServer, {
    cors: {
        origin: CORS_AUTH,
        methods: ["GET", "POST"],
        credentials: true
    }
});

const URL_WhiteList = ["http://localhost:5173", "https://steam-clon-ai-web.vercel.app"]

SteamServer.use(cookieParser());
SteamServer.use(express.json());
SteamServer.use(cors({
    origin: CORS_AUTH,
    credentials: true,
    optionsSuccessStatus: 200
}))
SteamServer.disable("x-powered-by");

SteamServer.use("/api", ApplictionRouter);

SteamServer.use((req, res, next) => {
    // Redirige a la ruta principal si la ruta no está definida
    res.redirect(process.env.NODE_ENV === "production" ? "https://steam-clon-ai-web.vercel.app" : "http://localhost:5173");
});

// ------------> Socket.IO Config - "/chat"
const Websocket = io.of("/status")
Websocket.use(checkIdentification)
Websocket.on("connection", StatusWebsocket);

// ------------> Socket.IO Config - "/notifications"

// Server Listing
httpServer.listen(SERVERPORT, () => {
    console.log(`Steam Server Up on: http://localhost:${SERVERPORT}`);
});
