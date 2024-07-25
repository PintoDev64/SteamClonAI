import { FieldPacket } from "mysql2";
import { createMongoConnection, createMySQLConnection } from "..";
import { handleFunction } from "../Handlers/Error";

// Constants
const collectionName = "GameData";

export async function getProducts(userId: number): DatabaseOperation.GenericClassReturnType {
    return await handleFunction(async () => {
        const mysql = await createMySQLConnection()
        if (!mysql) return undefined
        const [results, _fields]: MySQLSchemas.__QueryArray = await mysql.query(
            "SELECT `ITEMS` FROM `Cart` WHERE ACCOUNT_ID = ?",
            [userId]
        )
        const { ITEMS } = results[0] as MySQLSchemas.CartTable
        return ITEMS
    })
}
/**
 * 
 */
export async function setProducts(userId: number, productId: string): DatabaseOperation.GenericClassReturnType {
    return await handleFunction(async () => {
        const mongo = createMongoConnection()
        const mysql = await createMySQLConnection()
        // -----------> THROW ERROR
        if (!mongo || !mysql) return undefined

        const collection = mongo.collection(collectionName)
        const [results, _fields]: MySQLSchemas.__QueryArray = await mysql.query(
            "SELECT `ITEMS` FROM `Cart` WHERE ACCOUNT_ID = ?",
            [userId]
        )

        const { _id, downloadUrl, ...rest } = await collection.findOne({ idGame: productId }) as getGameDataType
        const { ITEMS } = results[0] as MySQLSchemas.CartTable
        const UpdateWishlist = [...ITEMS, { ...rest }]
        const [update, _updateFields]: MySQLSchemas.__QueryArray = await mysql.query(
            'UPDATE `Cart` SET `ITEMS` = ? WHERE `ACCOUNT_ID` = ? ',
            [JSON.stringify(UpdateWishlist), userId]
        )
        if (update) {
            return update
        }
        // -----------> THROW ERROR
        return undefined
    })
}
export async function deleteProducts(userId: number): DatabaseOperation.GenericClassReturnType {
    return await handleFunction(async () => {
        
    })
}
export async function buyProducts(userId: number): DatabaseOperation.GenericClassReturnType {
    return await handleFunction(async () => {
        const mongo = createMongoConnection()
        const mysql = await createMySQLConnection()

        // -----------> THROW ERROR
        if (!mongo || !mysql) return undefined

        const [results, _fields]: MySQLSchemas.__QueryArray = await mysql.query(
            "SELECT `ITEMS` FROM `Cart` WHERE ACCOUNT_ID = ?",
            [userId]
        )
        const { ITEMS } = results[0] as MySQLSchemas.CartTable
        console.log(ITEMS);

        // -----------> THROW ERROR
        if (ITEMS.length === 0) return undefined

        const GamesOnLibrary: Array<any> = ITEMS.map(({ idGame }: { idGame: any }) => idGame)
        console.log(GamesOnLibrary.toString());

        const collection = mongo.collection(collectionName)
        let gamesFinded = await collection.find({ idGame: GamesOnLibrary }).toArray()

        console.log("gamesFinded: ", gamesFinded);

        if (gamesFinded.length > 0) {
            return gamesFinded
        }
        // -----------> THROW ERROR
        return undefined
    })
}