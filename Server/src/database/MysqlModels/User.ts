import { MysqlDatabase } from "..";

export default class User extends MysqlDatabase {
    constructor() {
        super();
        this.createUser = this.createUser.bind(this);
    }

    public async createUser(data: UserType & PublicIdType & TokenType & PasswordType): GenericClassReturnType {
        try {
            const db = await this.createConnection()
            const [results, _fields] = await db.query("INSERT INTO `User` (`PUBLIC_ID`,`STATUS`,`PROFILE_NAME`,`ACCOUNT_NAME`,`REAL_NAME`,`VAC_STATUS`,`MAIL`,`THEME`,`PROFILE_PICTURE`,`BACKGROUND_IMAGE`,`TOKEN`,`PASSWORD`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);", [
                data.publicId,
                data.status,
                data.profileName,
                data.AccountName,
                data.realName,
                data.vacStatus,
                data.mail,
                data.theme,
                data.profilePicture,
                data.backgroundImage,
                data.token,
                data.password,
            ])

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
            await this.closeConnection()
        }
    }
    public async modifyUser() {

    }
}