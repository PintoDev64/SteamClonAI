import { config } from "dotenv"
import { resolve } from 'node:path'

config({
    path: (process.env.NODE_ENV === "development" || process.env.NODE_ENV === undefined) ? resolve(process.cwd(), "vars.development.env") : resolve(process.cwd(), "vars.production.env")
})

// ENV Variables
export const SERVERPORT = process.env.PORT ?? 0
export const MONGODB_DBNAME = process.env.MONGODB_DBNAME as string
export const MONGODB_URI: string = process.env.MONGODB_URI_CONNECTION as string

// Default HTTP Responses
export const DEFAULT_404 = {
    message: "resource could not be found"
}
export const DEFAULT_500 = {
    message: "We are sorry for the inconvenience with the service, we are investigating what happened, thank you :("
}