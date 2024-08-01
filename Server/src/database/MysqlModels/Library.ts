// Handlers
import ErrorHandler from "../Handlers/Error"
import MysqlHandler from "../Handlers/MysqlHandler"

/**
 * Obtiene la libreria del usuario
 */
export async function getLibraryUser({ publicId }: Library.getUserParams): DatabaseOperation.GenericClassReturnType {
    return await ErrorHandler.Wrapper(async () => {
        return await MysqlHandler.Select("User", ["LIBRARY"], {
            Where: {
                Columns: ["PUBLIC_ID"],
                Values: [publicId]
            }
        })
    })
}