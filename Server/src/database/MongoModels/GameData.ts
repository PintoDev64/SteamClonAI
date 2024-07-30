import { Document, FindCursor, WithId } from 'mongodb';
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

export async function getGameData({ idGame, name }: GameData.IdGameType): DatabaseOperation.GenericClassReturnType {
    return await handleFunction(async () => {
        const mongo = createMongoConnection();
        if (!mongo) return undefined
        const collection = mongo.collection(collectionName)

        let result: WithId<Document>[] | WithId<Document> | null

        if (typeof idGame === 'object' || typeof name === 'object') {
            if (idGame) {
                result = await collection.find({ idGame: { $in: [...idGame] } }).toArray()
            } else {
                result = await collection.find({ name: { $in: [...name!] } }).toArray()
            }
        } else {
            if (idGame) {
                result = await collection.findOne({ idGame })
            } else {
                result = await collection.findOne({ name })
            }
        }

        if (result) {
            let ModifyResponse: any[] | any
            if (typeof idGame === 'object' || typeof name === 'object') {
                ModifyResponse = []
                result.map(({ _id, ...rest }: { [x: string]: any }) => ModifyResponse.push({ ...rest }))
            } else {
                ModifyResponse = result
            }

            return ModifyResponse
        }
        return undefined
    })
}

type getAllGameFilterProps = { limit: number }
export async function getAllGamesFilter({ limit }: getAllGameFilterProps) {
    return await handleFunction(async () => {
        const mongo = createMongoConnection();
        if (!mongo) return undefined
        const collection = mongo.collection(collectionName)

        const result = await collection.find({}).toArray()

        if (result) {
            const NamesGame = result as getGameDataType[]
            const MathOperation = Math.floor(Math.random() * (result.length - limit + 1)) + limit;
            const ResponseFormated = NamesGame.slice(0, 10)

            return ResponseFormated
        }
        return undefined
    })
}

export async function getAllGameNames(): DatabaseOperation.GenericClassReturnType {
    return await handleFunction(async () => {
        const mongo = createMongoConnection();
        if (!mongo) return undefined
        const collection = mongo.collection(collectionName)

        const result = await collection.find({}).toArray()
        if (result) {
            const NamesGame = (result as getGameDataType[]).map(({ name }) => name)
            return NamesGame.join(", ")
        }
        return undefined
    })
}

export async function getAllGamesOffers() {
    return await handleFunction(async () => {
        const mongo = createMongoConnection();
        if (!mongo) return undefined
        const collection = mongo.collection(collectionName)

        const result = await collection.find({ products: { $elemMatch: { 'price.discount': { $exists: true } } } }).toArray()
        if (result) {
            return result
        }
        return undefined
    })
}