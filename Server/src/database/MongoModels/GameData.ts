import Database from '..';

export default class GameData extends Database {
    private collectionName = "GameData";
    constructor() {
        super();
        this.insertGameData = this.insertGameData.bind(this);
        this.findGameData = this.findGameData.bind(this);
    }

    public async insertGameData(data: GameDataType & IdGameType): GenericClassReturnType {
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

    public async findGameData({ idGame }: { idGame: string }): GenericClassReturnType {
        try {
            const db = await this.createMongoConnection();
            const collection = db.collection(this.collectionName);

            //------> Test - Throw Error

            // throw new Error()
            
            //------> Test - Throw Error

            const result = await collection.findOne({ idGame })
            if (result) {
                const { _id, ...rest } = result
                return {
                    status: "200",
                    data: {...rest}
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