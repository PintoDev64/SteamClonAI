import { config } from "dotenv"
import { resolve } from 'node:path'

config({
    path: (process.env.NODE_ENV === "development" || process.env.NODE_ENV === undefined) ? resolve(process.cwd(), "vars.development.env") : resolve(process.cwd(), "vars.production.env")
})

// ENV Variables

// --------------> MongoDB
export const SERVERPORT = process.env.PORT ?? 0
export const MONGODB_DBNAME = process.env.MONGODB_DBNAME as string
export const MONGODB_URI: string = process.env.MONGODB_URI_CONNECTION as string

// --------------> MySQL
export const MYSQLDB_DBNAME = process.env.MYSQLDB_DBNAME as string
export const MYSQLDB_USER = process.env.MYSQLDB_USER as string
export const MYSQLDB_PASSWORD = process.env.MYSQLDB_PASSWORD as string
export const MYSQLDB_URI = process.env.MYSQLDB_URI_CONNECTION as string
export const MYSQLDB_PORT = process.env.MYSQLDB_PORT as string

// --------------> MySQL
export const JWT_SECRET = process.env.JWT_SECRET as string