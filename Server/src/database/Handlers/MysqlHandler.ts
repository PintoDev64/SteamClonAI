import { FieldPacket } from "mysql2/promise";
import { createMySQLConnection } from "..";

export default class MysqlHandler {
    static async Custom<T extends MysqlOperationsMethods.InterfaceTablesType>(
        Query: MysqlOperationsMethods.ParamCustomQuery,
        Data: MysqlOperationsMethods.ParamData
    ): MysqlOperationsMethods.SelectReturnType<T> {
        const Database = await createMySQLConnection()

        const [results, _fields] = await Database?.query(
            Query,
            Data
        ) as MysqlOperationsMethods.__MysqlQuery

        return results[0]
    }
    /**
     * Consulta de insersion de datos en una tabla MySQL
     * @param Table Tabla donde se realizara al consulta
     * @param Columns Array de Columnas basdas en la tabla seleccionada
     * @param Data Array de datos a insertar NOTA: Deben estar en el mismo orden que las columnas
     * @returns Confirmacion de peticion -> Boolean
     */
    static async Insert<T extends MysqlOperationsMethods.InterfaceTablesType>(
        Table: MysqlOperationsMethods.ParamTable<T>,
        Columns: MysqlOperationsMethods.ParamColumns<T>,
        Data: MysqlOperationsMethods.ParamData
    ) {
        const Database = await createMySQLConnection()
        const ColumnsJoin = Columns.map(value => value).join(", ")
        const SubQuerysJoin = Columns.map(() => `?`).join(", ")

        let Query = `INSERT INTO ${Table} (${ColumnsJoin}) VALUES (${SubQuerysJoin})`

        const [results, _fields] = await Database?.query(
            Query,
            Data
        ) as MysqlOperationsMethods.__MysqlQuery

        return results
    }

    /**
     * Consulta de seleccion de datos en la tabla especificada de la Base de Datos
     * @param Table Tabla donde se realizara al consulta
     * @param Columns Array de Columnas basdas en la tabla seleccionada
     * @param SubQuery Consultads validas: Where, usadas para realizar procesos de consulta condicional
     * @returns Resultado de la base de dataos -> Array
     */
    static async Select<T extends MysqlOperationsMethods.InterfaceTablesType>(
        Table: MysqlOperationsMethods.ParamTable<T>,
        Columns: MysqlOperationsMethods.ParamColumns<T>,
        SubQuery?: MysqlOperationsMethods.ParamSubQuery<T>
    ): MysqlOperationsMethods.SelectReturnType<T> {
        const Database = await createMySQLConnection()

        const ColumnsJoin = Columns.map(value => `\`${value}\``).join(", ")
        const SubQuerysJoin = SubQuery?.Where?.Columns.map((Value) =>
            `\`${Value}\` = ?`
        ).join(" AND ")

        let Query: string

        if (SubQuerysJoin) {
            Query = `SELECT ${ColumnsJoin} FROM \`${Table}\` WHERE ${SubQuerysJoin};`
        } else {
            Query = `SELECT ${ColumnsJoin} FROM \`${Table}\`;`
        }

        const [results, _fields] = await Database.query(
            Query,
            SubQuery?.Where?.Values ?? []
        ) as MysqlOperationsMethods.__MysqlQuery

        return results[0]
    }

    /**
     * Actualiza uno o mas datos de una fila en la tabla especificada de la Base de Datos
     * @param Table Tabla donde se realizara al consulta
     * @param Columns Array de Columnas basdas en la tabla seleccionada
     * @param Data Array de datos a insertar NOTA: Deben estar en el mismo orden que las columnas
     * @param SubQuery Consultads validas: Where, usadas para realizar procesos de consulta condicional
     * @returns Confirmacion de peticion -> Boolean
     */
    static async Update<T extends MysqlOperationsMethods.InterfaceTablesType>(
        Table: MysqlOperationsMethods.ParamTable<T>,
        Columns: MysqlOperationsMethods.ParamColumns<T>,
        Data: MysqlOperationsMethods.ParamData,
        SubQuery: MysqlOperationsMethods.ParamSubQuery<T>
    ) {
        const Database = await createMySQLConnection()

        const SetsJoin = Columns.map(value => `${value} = ?`).join(", ")
        const SubQuerysJoin = SubQuery?.Where?.Columns.map((Value) =>
            `${Value} = ?`
        ).join(" AND ")

        let Query = `UPDATE ${Table} SET ${SetsJoin} WHERE ${SubQuerysJoin}`

        const [results, _fields] = await Database?.query(
            Query,
            [...Data, ...SubQuery?.Where?.Values]
        ) as MysqlOperationsMethods.__MysqlQuery

        return true
    }

    /**
     * Elimina un dato en la tabla especificada de la Base de Datos
     * @param Table Tabla donde se realizara al consulta
     * @param SubQuery Consultads validas: Where, usadas para realizar procesos de consulta condicional
     * @returns Confirmacion de peticion -> Boolean
     */
    static async Delete<T extends MysqlOperationsMethods.InterfaceTablesType>(
        Table: MysqlOperationsMethods.ParamTable<T>,
        SubQuery: MysqlOperationsMethods.ParamSubQuery<T>
    ) {
        const Database = await createMySQLConnection()

        const SubQuerysJoin = SubQuery?.Where?.Columns.map((Value) =>
            `${Value} = ?`
        ).join(" AND ")

        let Query = `DELETE FROM ${Table} WHERE ${SubQuerysJoin}`

        const [results, _fields] = await Database?.query(
            Query,
            [...SubQuery?.Where?.Values]
        ) as MysqlOperationsMethods.__MysqlQuery

        return true
    }
}

declare namespace MysqlOperationsMethods {
    // Local
    interface Tables {
        User: "PUBLIC_ID" | "STATUS" | "PROFILE_NAME" | "ACCOUNT_NAME" | "REAL_NAME" | "VAC_STATUS" | "MAIL" | "THEME" | "PROFILE_PICTURE" | "BACKGROUND_IMAGE" | "PASSWORD" | "CURRENCY" | "LIBRARY" | "*";
        Wishlist: "PUBLIC_ID" | "ITEMS" | "*";
        Cart: "ACCOUNT_ID" | "ITEMS" | "*";
    }

    interface TablesColumns {
        User: {
            PUBLIC_ID: string
            STATUS: string
            PROFILE_NAME: string
            ACCOUNT_NAME: string
            REAL_NAME: string
            VAC_STATUS: boolean
            MAIL: string
            THEME: number
            PROFILE_PICTURE: number
            BACKGROUND_IMAGE: number
            CURRENCY: number
            PASSWORD: string,
            LIBRARY: GameData[]
        };
        Wishlist: {
            PUBLIC_ID: string;
            ITEMS: GameData[];
        };
        Cart: {
            ACCOUNT_ID: number,
            ITEMS: GameData[]
        }
    ;
    }

    // Response Query
    type __MysqlQuery = [any, FieldPacket[]]

    //----------------------------------------------------------------->
    //
    type InterfaceTablesType = keyof Tables | keyof TablesColumns;
    // Methods Params
    type ParamCustomQuery = string;
    type ParamTable<T extends InterfaceTablesType> = T;
    type ParamColumns<T extends InterfaceTablesType> = Array<Tables[T]>;
    type ParamData = (string | number | boolean | null)[]
    type ParamSubQuery<T extends InterfaceTablesType> = {
        Where: {
            Columns: Array<Tables[T]>,
            Values: (string | number | boolean)[]
        },
    }

    //----------------------------------------------------------------->
    //
    // Select Method Return Types
    type SelectReturnType<T extends keyof TablesColumns> = Promise<TablesColumns[T]>
    

    interface GameData {
        idGame: UUIDPattern,
        name: string,
        shortDescription: string,
        icon: string,
        images: {
            type: "image" | "video",
            url: string
        }[],
        releaseDate: DatePattern // "DD-MM-YYYY",
        developer: {
            name: string,
            url: string
        },
        publishers: {
            name: string,
            url: string | undefined
        }[],
        downloadUrl: string,
        categories: string[],
        features: ("Single-Player" | "Online PvP" | "Online Co-op" | "Cross-Platform Multiplayer" | "Steam Achievements" | "Captiosn Available" | "In-App Purchases" | "Steam Cloud" | "Steam Trading Cards" | "Valve Anti-Cheat")[],
        requirements: {
            type: "3rd-Party Account",
            accountName: string
        } | undefined,
        lenguajes: Record<"Spanish" | "English", {
            interface?: boolean,
            subtitles?: boolean,
            audio?: boolean
        } | undefined>,
        links: {
            url: string
        },
        platforms: Record<"Win" | "Mac" | "Lin", {
            OS: string,
            processor: string,
            Memory: string,
            Graphics: string,
            DirectX: string,
            Storage: string,
            SoundCard?: string,
            AddiotionalNotes?: string,
        } | undefined>,
        products: {
            name: string,
            content?: string[],
            price: {
                default: number,
                format: "Dollar",
                discount?: {
                    value: number,
                    finalDate: string // "DD-MM-YYYY"
                }
            }
        }[],
        downloadableContent: {
            name: string,
            price: {
                default: number,
                format: "Dollar",
                discount: {
                    value: number,
                    finalDate: string // "DD-MM-YYYY"
                }
            }
        }[],
        about: string
    }
}