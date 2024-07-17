import { MongoClient, Db } from 'mongodb'
import { createConnection, Connection } from 'mysql2/promise';

// Constants
import { MONGODB_DBNAME, MONGODB_URI, MYSQLDB_URI, MYSQLDB_DBNAME, MYSQLDB_USER, MYSQLDB_PASSWORD, MYSQLDB_PORT } from '../constants';

export class MongoDatabase {
    protected mongoClient: MongoClient;
    protected db: Db | null = null;

    constructor() {
        this.mongoClient = new MongoClient(MONGODB_URI);
    }

    protected async createConnection(): Promise<Db> {
        if (!this.db) {
            await this.mongoClient.connect();
            this.db = this.mongoClient.db(MONGODB_DBNAME);
        }
        return this.db;
    }

    protected async closeConnection(): Promise<void> {
        await this.mongoClient.close();
        this.db = null;
    }
}

export class MysqlDatabase {
    protected mysqlClient: Connection | null = null;

    protected async createConnection(): Promise<Connection> {
        if (!this.mysqlClient) {
            this.mysqlClient = await createConnection({
                host: MYSQLDB_URI,
                user: MYSQLDB_USER,
                password: MYSQLDB_PASSWORD,
                database: MYSQLDB_DBNAME,
                port: parseInt(MYSQLDB_PORT),
                connectTimeout: 10000,
                maxIdle: 10,
                idleTimeout: 10000,
                queueLimit: 15,
                connectionLimit: 15
            });
        }
        return this.mysqlClient;
    }

    protected async closeConnection(): Promise<void> {
        this.mysqlClient = null
    }
}