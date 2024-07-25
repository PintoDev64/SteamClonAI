import { createMongoConnection } from '..';
import { handleFunction } from '../Handlers/Error';

// Constants
const collectionName = "GameData";

export async function insertGameData(data: GameData.InsertGameDataParam): DatabaseOperation.GenericClassReturnType {
    return await handleFunction(async () => {
        const mongo = createMongoConnection
        ();
        if (!mongo) return undefined
        const collection = mongo.collection(collectionName);

        await collection.insertOne(data);
        return "Operation Complete"
    })
}

export async function getGameData({ idGame }: GameData.IdGameType): DatabaseOperation.GenericClassReturnType {
    return await handleFunction(async () => {
        const mongo = createMongoConnection();
        if (!mongo) return undefined
        const collection = mongo.collection(collectionName)

        const result = await collection.findOne({ idGame })
        if (result) {
            const { _id, downloadUrl, ...rest } = result as getGameDataType
            return { ...rest }
        }
        return undefined
    })
}