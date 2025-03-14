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
        console.log("RequestData: ", { AccountName, backgroundImage, mail, password, profileName, profilePicture, publicId, realName, status, theme, vacStatus });

        const databaseExtractor = await MysqlHandler.Select("User", ["MAIL", "ACCOUNT_NAME"], {
            Like: {
                Columns: ["MAIL", "ACCOUNT_NAME"],
                Values: [mail, AccountName]
            }
        })

        console.log("databaseExtractor: ", databaseExtractor);

        if (databaseExtractor) {
            throw new Error("Usuario existente")
        }

        const MysqlInsert_User = await MysqlHandler.Insert(
            "User",
            ["PUBLIC_ID", "STATUS", "PROFILE_NAME", "ACCOUNT_NAME", "REAL_NAME", "VAC_STATUS", "MAIL", "THEME", "PROFILE_PICTURE", "BACKGROUND_IMAGE", "PASSWORD", "CURRENCY", "LIBRARY"],
            [publicId, status, profileName, AccountName, realName, vacStatus, mail, theme, profilePicture, backgroundImage, password, 15, JSON.stringify([])]
        )

        const { insertId } = MysqlInsert_User as MySQLSchemas.__FieldPacket

        await MysqlHandler.Insert(
            "Cart",
            ["ACCOUNT_ID", "ITEMS"],
            [insertId, JSON.stringify([])]
        )

        await MysqlHandler.Insert(
            "Wishlist",
            ["PUBLIC_ID", "ITEMS"],
            [publicId, JSON.stringify([])]
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
export async function getUser({ limited = true, publicId }: User.getUserParams): DatabaseOperation.GenericClassReturnType {
    return await ErrorHandler.Wrapper(async () => {
        const responseData = await MysqlHandler.Select("User", limited ? ["LIBRARY", "PROFILE_NAME", "PROFILE_PICTURE", "THEME", "REAL_NAME", "STATUS"] : ["*"], {
            Where: {
                Columns: ["PUBLIC_ID"],
                Values: [publicId]
            }
        })

        const { ITEMS } = await MysqlHandler.Select("Wishlist", ["ITEMS"], {
            Where: {
                Columns: ["PUBLIC_ID"],
                Values: [publicId]
            }
        })

        return {
            ...responseData,
            ITEMS: ITEMS
        }
    })
}