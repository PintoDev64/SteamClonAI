import express from "express";
import { config } from "dotenv"

config({
    path: process.env.NODE_ENV === "development" ? "vars.development.env" : "vars.production.env"
})

const SteamServer = express()

SteamServer.disable("X-Powered-By");

SteamServer.listen(() => {
    console.log(`Steam Server Up on: ${process.env.PORT ?? 0}`);
})