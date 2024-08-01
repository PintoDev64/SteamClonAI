import { Document, FindCursor, WithId } from 'mongodb';
import { createMongoConnection } from '..';
import ErrorHandler from '../Handlers/Error';
import MongoHandler from '../Handlers/MongoHandler';

// Constants
const collectionName = "GameData";

export async function insertGameData(data: GameData.InsertGameDataParam): DatabaseOperation.GenericClassReturnType {
    return await ErrorHandler.Wrapper(async () => {
        await MongoHandler.Insert(collectionName, [data])
        return true
    })
}

export async function getGameData({ idGame, name }: GameData.IdGameType): DatabaseOperation.GenericClassReturnType {
    return await ErrorHandler.Wrapper(async () => {

        let result: GameDataType | GameDataType[]

        if (typeof idGame === 'object' || typeof name === 'object') {
            if (idGame) {
                result = await MongoHandler.Select<GameDataType[]>(collectionName, { idGame: { $in: [...idGame] } }, true)

            } else {
                result = await MongoHandler.Select<GameDataType[]>(collectionName, { name: { $in: [...name!] } }, true)

            }
        } else {
            if (idGame) {
                result = await MongoHandler.Select<GameDataType>(collectionName, { idGame })

            } else {
                result = await MongoHandler.Select<GameDataType>(collectionName, { name })

            }
        }

        let ModifyResponse: any[] | any

        if (result) {
            if (typeof idGame === 'object' || typeof name === 'object') {
                ModifyResponse = (result as GameDataType[]).map(({ _id, ...rest }: { [x: string]: any }) => { return { ...rest } })
            } else {
                ModifyResponse = result
            }

            console.log("ModifyResponse: ", ModifyResponse);

            return ModifyResponse

        }
        return undefined
    })
}

type getAllGameFilterProps = { limit: number }
export async function getAllGamesFilter({ limit }: getAllGameFilterProps) {
    return await ErrorHandler.Wrapper(async () => {
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
    return await ErrorHandler.Wrapper(async () => {

        const result = await MongoHandler.Select<getGameDataType[]>(collectionName, {}, true)

        if (result) {
            const NamesGame = result.map(({ name }) => name).join(", ")
            return NamesGame
        }
        return undefined
    })
}

export async function getAllGamesOffers() {
    return await ErrorHandler.Wrapper(async () => {
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