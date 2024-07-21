import { FieldPacket } from "mysql2";
import Database from "..";

// Utils
import { checkChatsIds } from "./utils";

// Types
import { ChatFriendContract, ExistChatParams, FriendChatStructureType, GetChatParams } from "./contracts/FriendsChatContract";

// Types


export default class ChatFriend extends Database implements ChatFriendContract {
    private collectionName = "FriendChat";
    constructor() {
        super();
        this.existFriendChat = this.existFriendChat.bind(this)
        this.getChats = this.getChats.bind(this)
        this.insertMessage = this.insertMessage.bind(this)
    }

    public async existFriendChat({ chatId, yourPublicId, yourFriendId }: ExistChatParams): Promise<boolean> {
        try {
            const mysql = await this.createMysqlConnection()
            if (!mysql) return false
            const [FriendChatData, _field]: [any, FieldPacket[]] = await mysql.query("SELECT * FROM Friends WHERE RELATION_ID = ? LIMIT 1", [chatId])

            const resultFriendChatData: FriendsTableInterface = FriendChatData[0]

            const CheckerResponse = checkChatsIds({ resultFriendChatData, yourPublicId, yourFriendId })

            if (resultFriendChatData.RELATION_ID !== chatId) {
                return false
            }
            if (!CheckerResponse.checkOne) {
                return false
            }
            if (!CheckerResponse.checkTwo) {
                return false
            }
            return true
        } catch (err: any) {
            console.log(err.message);
            return false
        } finally {
            await this.closeMysqlConnection()
        }
    }

    public async getChats({ relationId, limit }: GetChatParams): GenericClassReturnType {
        try {
            const mongo = await this.createMongoConnection();
            if (!mongo) return { status: "500" }
            const collection = mongo.collection(this.collectionName);

            const MongoResponse = await collection.findOne({ relationId });

            if (MongoResponse && limit !== undefined) {
                const { data } = MongoResponse;
                return {
                    status: "200",
                    data: (data as FriendChatStructureType[]).slice(limit.min, limit.max)
                };
            } else if (MongoResponse && limit === undefined) {
                const { data } = MongoResponse;
                return {
                    status: "200",
                    data: (data as FriendChatStructureType[]).slice(0, 10)
                };
            } else {
                return {
                    status: "404"
                }
            }
        } catch (err: any) {
            return {
                status: "500"
            };
        } finally {
            await this.closeMongoConnection();
        }
    }

    public async insertMessage(data: FriendChatStructureType, relationId: number): GenericClassReturnType {
        try {
            const mongo = await this.createMongoConnection();
            if (!mongo) return { status: "500" }
            const collection = mongo.collection(this.collectionName);

            const result = await collection.findOne({ relationId });

            if (result) {
                const updatedData = [...result.data, data];

                // Actualizamos el documento con el array `data` modificado
                await collection.updateOne(
                    { relationId },
                    { $set: { data: updatedData } }
                );
                return {
                    status: "200",
                    data: "Operation Complete"
                };
            } else {
                return {
                    status: "404",
                }
            }
        } catch (err: any) {
            console.log(err.message);
            return {
                status: "500"
            };
        } finally {
            await this.closeMongoConnection();
        }
    }
}