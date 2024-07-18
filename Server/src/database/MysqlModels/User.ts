import Database from "..";

export default class User extends Database {
    private collectionName = "ProfileReviews"
    constructor() {
        super();
        this.createUser = this.createUser.bind(this);
        this.getUser = this.getUser.bind(this);
    }

    public async createUser(data: UserType & PublicIdType & TokenType & PasswordType): GenericClassReturnType {
        try {
            const mysql = await this.createMysqlConnection()
            const mongo = await this.createMongoConnection()

            const [results, _fields] = await mysql.query(
                "INSERT INTO `User` (`PUBLIC_ID`,`STATUS`,`PROFILE_NAME`,`ACCOUNT_NAME`,`REAL_NAME`,`VAC_STATUS`,`MAIL`,`THEME`,`PROFILE_PICTURE`,`BACKGROUND_IMAGE`,`TOKEN`,`PASSWORD`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);", 
                [data.publicId,data.status,data.profileName,data.AccountName,data.realName,data.vacStatus,data.mail,data.theme,data.profilePicture,data.backgroundImage,data.token,data.password])
            const collection = mongo.collection(this.collectionName)

            await collection.insertOne({
                publicId: data.publicId,
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
    public async getUser({ publicId }: { publicId: string }): GenericClassReturnType {
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