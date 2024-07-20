import Database from "..";

// Class Type Definition
import { createUserParams, getUserParams, UserContract } from "./contracts/UserContract";

export default class User extends Database implements UserContract {
    private collectionName = "ProfileReviews"
    constructor() {
        super();
        this.createUser = this.createUser.bind(this);
        this.getUser = this.getUser.bind(this);
    }

    public async createUser({ AccountName, backgroundImage, mail, password, profileName, profilePicture, publicId, realName, status, theme, token, vacStatus
     }: createUserParams): GenericClassReturnType {
        try {
            const mysql = await this.createMysqlConnection()
            const mongo = await this.createMongoConnection()

            const [results, _fields] = await mysql.query(
                "INSERT INTO `User` (`PUBLIC_ID`,`STATUS`,`PROFILE_NAME`,`ACCOUNT_NAME`,`REAL_NAME`,`VAC_STATUS`,`MAIL`,`THEME`,`PROFILE_PICTURE`,`BACKGROUND_IMAGE`,`TOKEN`,`PASSWORD`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);", 
                [publicId,status,profileName,AccountName,realName,vacStatus,mail,theme,profilePicture,backgroundImage,token,password])
            const collection = mongo.collection(this.collectionName)

            await collection.insertOne({
                publicId: publicId,
                data: []
            })

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
            await this.closeMongoConnection()
        }
    }
    public async getUser({ publicId }: getUserParams): GenericClassReturnType {
        try {
            const db = await this.createMysqlConnection()
            const [results, _fields] = await db.query("SELECT PUBLIC_ID,STATUS,PROFILE_NAME,REAL_NAME,VAC_STATUS,THEME,PROFILE_PICTURE,BACKGROUND_IMAGE FROM `User` WHERE PUBLIC_ID = ?", [publicId])

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
}