import express from "express";
import { resolve } from 'node:path'

// Main Router
import ApplictionRouter from "./modules";

// Const
import { SERVERPORT } from "./constants";

const SteamServer = express()

SteamServer.disable("x-powered-by");

SteamServer.use("/api", ApplictionRouter)

SteamServer.listen(SERVERPORT, () => {
    console.log(`Steam Server Up on: ${SERVERPORT}`);
})