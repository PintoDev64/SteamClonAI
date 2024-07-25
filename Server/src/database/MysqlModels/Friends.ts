
import { createMongoConnection, createMySQLConnection } from "..";

// Handlers
import { handleFunction } from "../Handlers/Error";

// Constants
const collectionName = "FriendChat"

/**
 * Crea un nuevo registro en la tabla "Friends" cuando se envia una solicitud de amistad
 */
export async function submitFriendRequest({ friendOne, friendTwo }: Friends.submitFriendRequestParam): DatabaseOperation.GenericClassReturnType {
    return await handleFunction(async () => {
        const mysql = await createMySQLConnection()
        if (!mysql) return undefined
        await mysql.query(
            "INSERT INTO `Friends` (`STATUS`, `FRIEND_ONE_ID`, `FRIEND_TWO_ID`) VALUES (?,?,?)",
            [false, friendOne, friendTwo],
        )

        const [results, _fields] = await mysql.query(
            "SELECT STATUS FROM Friends ORDER BY RELATION_ID DESC LIMIT 1"
        )

        return results
    })
}
/**
 * Obtiene los amigos de un usuario
 */
export async function getFriends({ limit = 5 }: Friends.getFriendsParams): DatabaseOperation.GenericClassReturnType {
    return await handleFunction(async () => {
        const mysql = await createMySQLConnection()
        if (!mysql) return undefined
        const [results, _fields] = await mysql.query(
            "SELECT STATUS FROM Friends ORDER BY RELATION_ID DESC LIMIT ?",
            [limit]
        )

        return results
    })
}
/**
 * Actualiza el estado de una solicitud de amistad
 */
export async function responseFriendRequest({ response, requestFriend, yourPublicId }: Friends.responseFriendRequestParams): DatabaseOperation.GenericClassReturnType {
    return await handleFunction(async () => {
        const mongo = createMongoConnection()
        const mysql = await createMySQLConnection()

        if (!mongo || !mysql) return undefined

        if (response) {
            await mysql.query(
                "UPDATE `Friends` SET `STATUS` = true WHERE `FRIEND_ONE_ID` = ? AND `FRIEND_TWO_ID` = ?",
                [yourPublicId, requestFriend]
            )
            const [FriendChatData, _field]: MySQLSchemas.__QueryArray  = await mysql.query(
                "SELECT RELATION_ID FROM Friends ORDER BY RELATION_ID DESC LIMIT 1"
            )

            const resultFriendChatData = FriendChatData[0] as MySQLSchemas.FriendsTable

            const collection = mongo.collection(collectionName)

            await collection.insertOne({
                relationId: resultFriendChatData.RELATION_ID,
                data: []
            })

            return "Operation Complete"
        } else {
            const [results, _fields]: MySQLSchemas.__QueryArray = await mysql.query(
                "DELETE FROM `Friends` WHERE `FRIEND_ONE_ID` = ? AND `FRIEND_TWO_ID` = ?",
                [yourPublicId, requestFriend]
            )

            return results
        }
    })
}