import { MongoClient, Db } from 'mongodb'
import { createConnection, Connection } from 'mysql2/promise';

// Constants
import { MONGODB_DBNAME, MONGODB_URI, MYSQLDB_URI, MYSQLDB_DBNAME, MYSQLDB_USER, MYSQLDB_PASSWORD, MYSQLDB_PORT } from '../constants';

export default class Database {
    protected mongoClient: MongoClient | null = null;
    protected mysqlClient: Connection | null = null;

    constructor() {
        new MongoClient(MONGODB_URI, {
            maxIdleTimeMS: 100,
            maxConnecting: 50,
            maxPoolSize: 50,
            noDelay: true,
            socketTimeoutMS: 2000
        }).connect()
            .then(value => this.mongoClient = value)
            .catch(err => console.log(err));
        createConnection({
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
            .then(value => this.mysqlClient = value)
            .catch(err => console.log(err));
    }

    protected async createMongoConnection(): Promise<Db | null> {
        if (this.mongoClient) {
            return this.mongoClient.db(MONGODB_DBNAME);
        }
        return null
    }

    protected createMysqlConnection(): Connection | null {
        if (this.mysqlClient) {
            return this.mysqlClient;
        }
        return null
    }

    protected async closeMongoConnection(): Promise<void> {
        if (this.mongoClient !== null) {
            await this.mongoClient.close();
            this.mongoClient = null;
        }
    }

    protected async closeMysqlConnection(): Promise<void> {
        if (this.mysqlClient !== null) {
            await this.mysqlClient.end()
            this.mysqlClient = null
        }
    }
}