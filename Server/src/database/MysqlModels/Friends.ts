import { FieldPacket } from "mysql2";
import Database from "..";

// Class Type Definition
import { FriendContract, FriendsParam, getFriendsParams, responseFriendRequestParams } from "./contracts/FriendsContract";

export default class Friends extends Database implements FriendContract {
    private collectionName = "FriendChat"
    constructor() {
        super();
        this.submitFriendRequest = this.submitFriendRequest.bind(this)
        this.getFriends = this.getFriends.bind(this)
        this.responseFriendRequest = this.responseFriendRequest.bind(this)
    }

    public async submitFriendRequest({ friendOne, friendTwo }: FriendsParam): GenericClassReturnType {
        try {
            const mysql = await this.createMysqlConnection()
            if (!mysql) return { status: "500" }
            await mysql.query(
                "INSERT INTO `Friends` (`STATUS`, `FRIEND_ONE_ID`, `FRIEND_TWO_ID`) VALUES (?,?,?)",
                [false, friendOne, friendTwo],
            )

            const [results, _fields] = await mysql.query(
                "SELECT STATUS FROM Friends ORDER BY RELATION_ID DESC LIMIT 1"
            )

            return {
                status: "200",
                data: results
            }
        } catch (err: any) {
            console.log(err.message);
            return {
                status: "404"
            }
        } finally {
            await this.closeMysqlConnection()
        }
    }

    public async getFriends({ limit }: getFriendsParams): GenericClassReturnType {
        try {
            const mysql = await this.createMysqlConnection()
            if (!mysql) return { status: "500" }
            const [results, _fields] = await mysql.query(
                "SELECT STATUS FROM Friends ORDER BY RELATION_ID DESC LIMIT 1"
            )

            return {
                status: "200",
                data: results
            }
        } catch (err: any) {
            console.log(err.message);
            return {
                status: "404"
            }
        } finally {
            await this.closeMysqlConnection()
        }
    }

    public async responseFriendRequest({ response, requestFriend, yourPublicId }: responseFriendRequestParams): GenericClassReturnType {
        try {
            const mysql = await this.createMysqlConnection();
            const mongo = await this.createMongoConnection();

            if (!mongo || !mysql) return { status: "500" }

            if (response) {
                await mysql.query(
                    "UPDATE `Friends` SET `STATUS` = true WHERE `FRIEND_ONE_ID` = ? AND `FRIEND_TWO_ID` = ?",
                    [yourPublicId, requestFriend]
                )
                const [FriendChatData, _field]: [any, FieldPacket[]] = await mysql.query(
                    "SELECT RELATION_ID FROM Friends ORDER BY RELATION_ID DESC LIMIT 1"
                )

                const resultFriendChatData: FriendsTableInterface = FriendChatData[0]

                const collection = mongo.collection(this.collectionName)

                await collection.insertOne({
                    relationId: resultFriendChatData.RELATION_ID,
                    data: []
                })

                return {
                    status: "200",
                    data: {}
                }
            } else {
                const [results, _fields] = await mysql.query(
                    "DELETE FROM `Friends` WHERE `FRIEND_ONE_ID` = ? AND `FRIEND_TWO_ID` = ?",
                    [yourPublicId, requestFriend]
                )

                return {
                    status: "200",
                    data: results
                }
            }
        } catch (err: any) {
            return {
                status: "404"
            }
        } finally {

        }
    }
}