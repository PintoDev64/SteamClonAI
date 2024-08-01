import ErrorHandler from "../Handlers/Error";

// Handlers
import MysqlHandler from "../Handlers/MysqlHandler";

// Constants
const collectionName = "FriendChat"

/**
 * Crea un nuevo registro en la tabla "Friends" cuando se envia una solicitud de amistad
 */
export async function submitFriendRequest({ friendOne, friendTwo }: Friends.submitFriendRequestParam): DatabaseOperation.GenericClassReturnType {
    return await ErrorHandler.Wrapper(async () => {

        await MysqlHandler.Insert(
            "Friends",
            ["STATUS", "FRIEND_ONE_ID", "FRIEND_TWO_ID"],
            [false, friendOne, friendTwo]
        )

        await MysqlHandler.Select(
            "Friends",
            ["STATUS"]
        )

        const results = await MysqlHandler.Custom<"Friends">(
            "SELECT STATUS FROM Friends ORDER BY RELATION_ID DESC LIMIT 1",
            []
        )
        return results
    })
}
/**
 * Obtiene los amigos de un usuario
 */
export async function getFriends({ limit = 5 }: Friends.getFriendsParams): DatabaseOperation.GenericClassReturnType {
    return await ErrorHandler.Wrapper(async () => {
        const results = await MysqlHandler.Custom<"Friends">(
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
    return await ErrorHandler.Wrapper(async () => {
        return await MysqlHandler.Update("Friends", ["STATUS"], [response], {
            Where: {
                Columns: ["FRIEND_ONE_ID", "FRIEND_TWO_ID"],
                Values: [yourPublicId, requestFriend]
            }
        })
    })
}