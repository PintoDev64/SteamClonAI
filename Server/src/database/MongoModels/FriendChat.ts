import { createMongoConnection, createMySQLConnection } from "..";

// Utils
import { checkChatsIds } from "./utils";

// Types
import { handleFunction } from "../Handlers/Error";

// Constants
const collectionName = "FriendChat";

export async function existFriendChat({ chatId, yourPublicId, yourFriendId }: FriendsChat.ExistChatParams): DatabaseOperation.GenericClassReturnType {
    return await handleFunction(async () => {
        const mysql = await createMySQLConnection()
        if (!mysql) return undefined
        const [FriendChatData, _field]: MySQLSchemas.__QueryArray = await mysql.query("SELECT * FROM Friends WHERE RELATION_ID = ? LIMIT 1", [chatId])

        const resultFriendChatData: MySQLSchemas.FriendsTable = FriendChatData[0]

        const CheckerResponse = checkChatsIds({ resultFriendChatData, yourPublicId, yourFriendId })

        if (resultFriendChatData.RELATION_ID !== chatId) {
            return undefined
        }
        if (!CheckerResponse.checkOne) {
            return undefined
        }
        if (!CheckerResponse.checkTwo) {
            return undefined
        }
        return true
    })
}

export async function getChats({ relationId, limit }: FriendsChat.GetChatParams): DatabaseOperation.GenericClassReturnType {
    return await handleFunction(async () => {
        const mongo = createMongoConnection();
        if (!mongo) return undefined
        const collection = mongo.collection(collectionName);

        const MongoResponse = await collection.findOne({ relationId });

        if (MongoResponse && limit !== undefined) {
            const { data } = MongoResponse;
            return (data as FriendsChat.FriendChatStructureType[]).slice(limit.min, limit.max)
        } else if (MongoResponse && limit === undefined) {
            const { data } = MongoResponse;
            return (data as FriendsChat.FriendChatStructureType[]).slice(0, 10)
        } else {
            return undefined
        }
    })
}

export async function insertMessage(data: FriendsChat.FriendChatStructureType, relationId: number): DatabaseOperation.GenericClassReturnType {
    return await handleFunction(async () => {
        const mongo = createMongoConnection();
        if (!mongo) return undefined
        const collection = mongo.collection(collectionName);

        const result = await collection.findOne({ relationId });

        if (result) {
            const updatedData = [...result.data, data];
            await collection.updateOne(
                { relationId },
                { $set: { data: updatedData } }
            );
            return "Operation Complete"
        }
        return undefined
    })
}