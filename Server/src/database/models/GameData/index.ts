import { response } from 'express';
import Database from '../..';

type insertGameData = Promise<{ status: number; error?: any }>
type findGameData = Promise<{ status: number; error?: any } | { [key: string]: any } | undefined | void>

export default class GameData extends Database {
    constructor() {
        super();
        this.insertGameData = this.insertGameData.bind(this);
        this.findGameData = this.findGameData.bind(this);
    }

    public async insertGameData(data: GameDataType): insertGameData {
        try {
            const db = await this.createConnection();
            const collection = db.collection('GameData');

            await collection.insertOne(data);
            return {
                status: 200
            };
        } catch (err: any) {
            return {
                status: 500,
                error: err.message
            };
        } finally {
            await this.closeConnection();
        }
    }

    public async findGameData({ idGame }: { idGame: string }): findGameData {
        try {
            const db = await this.createConnection();
            const collection = db.collection('GameData');

            const result = await collection.findOne({ idGame: idGame })
            if (result) {
                const { _id, ...rest } = result
                return {
                    ...rest
                }
            } else {
                return undefined
            }
        } catch (err: any) {
            return {
                status: 500,
                error: err.message
            };
        } finally {
            await this.closeConnection();
        }
    }
}