import { createMySQLConnection } from ".."

// Handlers
import { handleFunction } from "../Handlers/Error";

/**
 * Obtiene la libreria publica del usuario
 */
export async function getPublicLibraryUser({ publicId }: Library.getUserParams): DatabaseOperation.GenericClassReturnType {
    return await handleFunction(async () => {
        const mysql = await createMySQLConnection()
        if (!mysql) return undefined
        const [results, _fields] = await mysql.query("SELECT LIBRARY FROM `User` WHERE PUBLIC_ID = ?", [publicId])

        return results
    })
}
/**
 * Obtiene la libreria privada del usuario
 */
export async function getPrivateLibraryUser({ accountId }: Library.getPrivateUserParams): DatabaseOperation.GenericClassReturnType {
    return await handleFunction(async () => {
        const mysql = await createMySQLConnection()
        if (!mysql) return undefined
        const [results, _fields] = await mysql.query("SELECT LIBRARY FROM `User` WHERE PUBLIC_ID = ?", [accountId])

        return results
    })
}