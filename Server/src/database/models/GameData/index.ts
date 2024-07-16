import { response } from 'express';
import Database from '../..';

type insertGameData = Promise<{ status: number; error?: any }>
type findGameData = Promise<{ status: number; data?: any }>

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

            //------> Test - Throw Error

            // throw new Error()
            
            //------> Test - Throw Error

            const result = await collection.findOne({ idGame: idGame })
            if (result) {
                const { _id, ...rest } = result
                return {
                    status: 200,
                    data: {...rest}
                }
            } else {
                return {
                    status: 404
                }
            }
        } catch (err: any) {
            return {
                status: 500
            };
        } finally {
            await this.closeConnection();
        }
    }
}