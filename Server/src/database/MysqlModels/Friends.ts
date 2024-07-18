import { FieldPacket } from "mysql2";
import Database from "..";

type responseFriendRequestProps = { response: boolean, requestFriend: string, yourPublicId: string }

export default class Friends extends Database {
    private collectionName = "FriendChat"
    constructor() {
        super();
        this.submitFriendRequest = this.submitFriendRequest.bind(this)
        this.responseFriendRequest = this.responseFriendRequest.bind(this)
    }

    public async submitFriendRequest(data: FriendsType): GenericClassReturnType {
        try {
            const mysql = await this.createMysqlConnection()

            await mysql.query(
                "INSERT INTO `Friends` (`STATUS`, `FRIEND_ONE_ID`, `FRIEND_TWO_ID`) VALUES (?,?,?)",
                [false, data.friendOne, data.friendTwo],
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


    public async responseFriendRequest({ response, requestFriend, yourPublicId }: responseFriendRequestProps): GenericClassReturnType {
        try {
            const mysql = await this.createMysqlConnection();
            const mongo = await this.createMongoConnection();

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