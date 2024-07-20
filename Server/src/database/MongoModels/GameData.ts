import Database from '..';
import { GameDataContract, GetGameDataParam, InsertGameDataParam } from './contracts/GameDataContract';

export default class GameData extends Database implements GameDataContract {
    private collectionName = "GameData";
    constructor() {
        super();
        this.insertGameData = this.insertGameData.bind(this);
        this.getGameData = this.getGameData.bind(this);
    }

    public async insertGameData(data: InsertGameDataParam): GenericClassReturnType {
        try {
            const db = await this.createMongoConnection();
            const collection = db.collection(this.collectionName);

            await collection.insertOne(data);
            return {
                status: "200",
                data: "Operation Complete"
            };
        } catch (err: any) {
            return {
                status: "500"
            };
        } finally {
            await this.closeMongoConnection();
        }
    }

    public async getGameData({ idGame }: GetGameDataParam): GenericClassReturnType {
        try {
            const db = await this.createMongoConnection();
            const collection = db.collection(this.collectionName)

            const result = await collection.findOne({ idGame })
            if (result) {
                const { _id, ...rest } = result
                return {
                    status: "200",
                    data: { ...rest }
                }
            } else {
                return {
                    status: "404"
                }
            }
        } catch (err: any) {
            return {
                status: "500"
            };
        } finally {
            await this.closeMongoConnection();
        }
    }
}