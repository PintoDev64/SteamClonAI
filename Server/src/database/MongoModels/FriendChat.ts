import { createMongoConnection, createMySQLConnection } from "..";
import ErrorHandler from "../Handlers/Error";
import MongoHandler from "../Handlers/MongoHandler";
import MysqlHandler from "../Handlers/MysqlHandler";

// Utils
import { checkChatsIds } from "./utils";

// Hnalders

// Constants
const collectionName = "FriendChat";

export async function existFriendChat({ chatId, yourPublicId, yourFriendId }: FriendsChat.ExistChatParams): DatabaseOperation.GenericClassReturnType {
    return await ErrorHandler.Wrapper(async () => {
        const mysql = await createMySQLConnection()
        if (!mysql) return undefined
        const RelationResults = await MysqlHandler.Custom<"Friends">("SELECT * FROM Friends WHERE RELATION_ID = ? LIMIT 1", [chatId])

        const CheckerResponse = checkChatsIds({
            resultFriendChatData: RelationResults,
            yourPublicId,
            yourFriendId
        })

        if (RelationResults.RELATION_ID !== chatId) return undefined
        if (!CheckerResponse.checkOne) return undefined
        if (!CheckerResponse.checkTwo) return undefined
        
        return true
    })
}

export async function getChats({ relationId, limit }: FriendsChat.GetChatParams): DatabaseOperation.GenericClassReturnType {
    return await ErrorHandler.Wrapper(async () => {
        const { data } = await MongoHandler.Select(collectionName, { relationId }) as { data: FriendsChat.FriendChatStructureType[] };

        if (data && limit) {
            return data.slice(limit.min, limit.max)
        } else if (data && !limit) {
            return data.slice(0, 10)
        } else {
            return undefined
        }
    })
}

export async function insertMessage(data: FriendsChat.FriendChatStructureType, relationId: number): DatabaseOperation.GenericClassReturnType {
    return await ErrorHandler.Wrapper(async () => {
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