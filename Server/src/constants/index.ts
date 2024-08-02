import { config } from "dotenv"
import { resolve } from 'node:path'
import { createOpenAI } from '@ai-sdk/openai';

config({
    path: (process.env.NODE_ENV === "development" || process.env.NODE_ENV === undefined) ? resolve(process.cwd(), "vars.development.env") : resolve(process.cwd(), "vars.production.env")
})

// ENV Variables

// --------------> Main
const OPENAI_APIKEY = process.env.OPENAI_APIKEY

// --------------> Global
export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS as string)

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

// OpenAI API -> Vercel AI SDK
export const GPT4o_mini = createOpenAI({
    apiKey: OPENAI_APIKEY,
    compatibility: "strict"
})

export const REDIRECT_MAIN = process.env.REDIRECT_MAIN as string