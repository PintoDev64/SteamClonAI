// Class Type Definition
import ErrorHandler from "../Handlers/Error";
import MongoHandler from "../Handlers/MongoHandler";
import MysqlHandler from "../Handlers/MysqlHandler";

// Constants
const collectionName = "ProfileReviews"

/**
 * 
 * @param data 
 * @returns 
 */
export async function createUser(data: User.createUserParams): DatabaseOperation.GenericClassReturnType {
    const { AccountName, backgroundImage, mail, password, profileName, profilePicture, publicId, realName, status, theme, vacStatus } = data;
    return await ErrorHandler.Wrapper(async () => {
        const MysqlInsert_User = await MysqlHandler.Insert(
            "User",
            ["PUBLIC_ID", "STATUS", "PROFILE_NAME", "ACCOUNT_NAME", "REAL_NAME", "VAC_STATUS", "MAIL", "THEME", "PROFILE_PICTURE", "BACKGROUND_IMAGE", "PASSWORD", "CURRENCY", "LIBRARY"],
            [publicId, status, profileName, AccountName, realName, vacStatus, mail, theme, profilePicture, backgroundImage, password, 15, null]
        )

        const { insertId } = MysqlInsert_User as MySQLSchemas.__FieldPacket

        await MysqlHandler.Insert(
            "Cart",
            ["ACCOUNT_ID", "ITEMS"],
            [insertId, null]
        )

        await MongoHandler.Insert(collectionName, [{
            publicId,
            data: []
        }])

        return true
    })
}

/**
 * Obtiene los datos de un usuario
 */
export async function getUser(data: User.getUserParams): DatabaseOperation.GenericClassReturnType {
    const { publicId } = data;
    return await ErrorHandler.Wrapper(async () => {
        const responseData = await MysqlHandler.Select("User", ["ACCOUNT_NAME", "MAIL", "CURRENCY"], {
            Where: {
                Columns: ["PUBLIC_ID"],
                Values: [publicId]
            }
        })
        return responseData
    })
}