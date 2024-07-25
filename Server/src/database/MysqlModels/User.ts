// Class Type Definition
import { createMongoConnection, createMySQLConnection } from "..";
import { handleFunction } from "../Handlers/Error";

// Constants
const collectionName = "ProfileReviews"

export async function createUser({ AccountName, backgroundImage, mail, password, profileName, profilePicture, publicId, realName, status, theme, token, vacStatus
}: User.createUserParams): DatabaseOperation.GenericClassReturnType {
    return await handleFunction(async () => {
        const mysql = await createMySQLConnection()
        const mongo = createMongoConnection()

        if (!mongo || !mysql) return undefined

        const [result] = await mysql.query(
            "INSERT INTO `User` (`PUBLIC_ID`,`STATUS`,`PROFILE_NAME`,`ACCOUNT_NAME`,`REAL_NAME`,`VAC_STATUS`,`MAIL`,`THEME`,`PROFILE_PICTURE`,`BACKGROUND_IMAGE`,`TOKEN`,`PASSWORD`, `LIBRARY`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);",
            [publicId, status, profileName, AccountName, realName, vacStatus, mail, theme, profilePicture, backgroundImage, token, password, []])

        const { insertId } = result as MySQLSchemas.__FieldPacket

        await mysql.query(
            "INSERT INTO `Cart` (`ACCOUNT_ID`, `ITEMS`) VALUES (?, '[]')",
            [insertId]
        )
        const collection = mongo.collection(collectionName)

        await collection.insertOne({
            publicId: publicId,
            data: []
        })

        return result
    })
}
/**
 * Obtiene los datos de un usuario
 */
export async function getUser({ publicId }: User.getUserParams): DatabaseOperation.GenericClassReturnType {
    return await handleFunction(async () => {
        const mysql = await createMySQLConnection()
        
        if (!mysql) return undefined

        const [results, _fields] = await mysql.query("SELECT PUBLIC_ID,STATUS,PROFILE_NAME,REAL_NAME,VAC_STATUS,THEME,PROFILE_PICTURE,BACKGROUND_IMAGE FROM `User` WHERE PUBLIC_ID = ?", [publicId])

        return results
    })
}