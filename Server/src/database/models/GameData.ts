import Database from '..';

type insertGameDataType = Promise<MethodReturnStructure>
type findGameDataType = Promise<MethodReturnStructure>

export default class GameData extends Database {
    constructor() {
        super();
        this.insertGameData = this.insertGameData.bind(this);
        this.findGameData = this.findGameData.bind(this);
    }

    public async insertGameData(data: GameDataType & IdGameType): insertGameDataType {
        try {
            const db = await this.createConnection();
            const collection = db.collection('GameData');

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
            await this.closeConnection();
        }
    }

    public async findGameData({ idGame }: { idGame: string }): findGameDataType {
        try {
            const db = await this.createConnection();
            const collection = db.collection('GameData');

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
            await this.closeConnection();
        }
    }
}