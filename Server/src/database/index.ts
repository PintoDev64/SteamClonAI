import { MongoClient, Db } from 'mongodb'
import { createConnection, Connection } from 'mysql2/promise';

// Constants
import { MONGODB_DBNAME, MONGODB_URI, MYSQLDB_URI, MYSQLDB_DBNAME, MYSQLDB_USER, MYSQLDB_PASSWORD, MYSQLDB_PORT } from '../constants';

const MongoConnection = new MongoClient(MONGODB_URI, {
    maxIdleTimeMS: 100,
    maxConnecting: 50,
    maxPoolSize: 50,
    noDelay: true,
    socketTimeoutMS: 2000
})
const MySQLConnection = createConnection({
    host: MYSQLDB_URI,
    user: MYSQLDB_USER,
    password: MYSQLDB_PASSWORD,
    database: MYSQLDB_DBNAME,
    port: parseInt(MYSQLDB_PORT),
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 50,
    maxIdle: 10,
    idleTimeout: 30000,
    connectTimeout: 10000,
})

export function createMongoConnection(): Db {
    return MongoConnection.db(MONGODB_DBNAME);
}

export async function createMySQLConnection(): Promise<Connection> {
    return await MySQLConnection
}