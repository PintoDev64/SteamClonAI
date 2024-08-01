import { createMongoConnection, createMySQLConnection } from "..";
import ErrorHandler from "../Handlers/Error";
import MysqlHandler from "../Handlers/MysqlHandler";
import MongoHandler from "../Handlers/MongoHandler";

// Constants
const collectionName = "GameData";

export async function getProducts(userId: number): DatabaseOperation.GenericClassReturnType {
    return await ErrorHandler.Wrapper(async () => {
        const mysql = await createMySQLConnection()
        if (!mysql) return undefined

        const results = await MysqlHandler.Select("Cart", ["ITEMS"], {
            Where: {
                Columns: ["ACCOUNT_ID"],
                Values: [userId]
            }
        })

        return results
    })
}
/**
 * 
 */
export async function setProducts(userId: number, productId: string): DatabaseOperation.GenericClassReturnType {
    return await ErrorHandler.Wrapper(async () => {
        const { _id, downloadUrl, ...rest } = await MongoHandler.Select<getGameDataType>(collectionName, { idGame: productId })
        const { ITEMS } = await MysqlHandler.Select("Cart", ["ITEMS"], {
            Where: {
                Columns: ["ACCOUNT_ID"],
                Values: [userId]
            }
        })

        const UpdateCart = [...ITEMS, { ...rest }]

        const results = await MysqlHandler.Update("Cart", ["ITEMS"], [JSON.stringify(UpdateCart)], {
            Where: {
                Columns: ["ACCOUNT_ID"],
                Values: [userId]
            }
        })

        return results
    })
}
export async function deleteProducts(userId: number, IdGame: UUIDPattern): DatabaseOperation.GenericClassReturnType {
    return await ErrorHandler.Wrapper(async () => {
        const { ITEMS } = await MysqlHandler.Select("Cart", ["ITEMS"], {
            Where: {
                Columns: ["ACCOUNT_ID"],
                Values: [userId]
            }
        })

        const newCartList = ITEMS.filter(({ idGame }) => idGame !== IdGame)

        await MysqlHandler.Update("Cart", ["ITEMS"], [JSON.stringify(newCartList)], {
            Where: {
                Columns: ["ACCOUNT_ID"],
                Values: [userId]
            }
        })

        return true
    })
}
export async function buyProducts(userId: number): DatabaseOperation.GenericClassReturnType {
    return await ErrorHandler.Wrapper(async () => {
        const { ITEMS } = await MysqlHandler.Select("Cart", ["ITEMS"], {
            Where: {
                Columns: ["ACCOUNT_ID"],
                Values: [userId]
            }
        })

        // -----------> THROW ERROR
        if (ITEMS.length === 0) return undefined

        const GamesOnLibrary = ITEMS.map(({ idGame }) => idGame)
        const Mongo_Response = await MongoHandler.Select<any[]>(collectionName, { idGame: GamesOnLibrary }, true)

        return Mongo_Response
    })
}