import { MongoClient, Db } from 'mongodb'

// Constants
import { MONGODB_DBNAME, MONGODB_URI } from '../constants';

export default class Database {
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