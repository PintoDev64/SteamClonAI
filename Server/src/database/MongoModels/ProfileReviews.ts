import { FieldPacket } from "mysql2";
import { createMongoConnection, createMySQLConnection } from "..";
import { creteNewDate } from "../../utils";
import { handleFunction } from "../Handlers/Error";

// Constants
const collectionName = "ProfileReviews";

export async function createProfileReview(data: GeneralTypes.ProfileReviewsType): DatabaseOperation.GenericClassReturnType {
    return await handleFunction(async () => {
        const mongo = createMongoConnection();
        if (!mongo) return undefined
        const collection = mongo.collection(collectionName);

        await collection.insertOne(data);
        return "Operation Complete"
    })
}

export async function insertProfileReview({ data, publicId }: ProfileReviews.insertProfileReviewType): DatabaseOperation.GenericClassReturnType {
    return await handleFunction(async () => {
        const mysql = await createMySQLConnection()
        const mongo = createMongoConnection();
        if (!mongo || !mysql) return undefined
        const collection = mongo.collection(collectionName);

        const result = await collection.findOne({ publicId });

        const [results]: [any, FieldPacket[]] = await mysql.query(
            "SELECT PROFILE_NAME, PROFILE_PICTURE FROM User WHERE PUBLIC_ID = ?",
            [data.publicId]
        )

        if (result) {
            const queryResult: MySQLSchemas.UserTable = results[0]

            const updatedData = [...result.data, {
                publicId: data.publicId,
                content: data.content,
                image: queryResult.PROFILE_PICTURE,
                username: queryResult.PROFILE_NAME,
                date: creteNewDate()
            } as GeneralTypes.ProfileReviewsType];

            await collection.updateOne(
                { publicId },
                { $set: { data: updatedData } }
            );

            return "Operation Complete"
        }
        return undefined
    })
}

export async function getProfileReviews({ publicId }: ProfileReviews.GetProfileReviewDef): DatabaseOperation.GenericClassReturnType {
    return await handleFunction(async () => {
        const mongo = createMongoConnection();
        if (!mongo) return undefined
        const collection = mongo.collection(collectionName);

        const result = await collection.findOne({ publicId })
        if (result) {
            const { _id, ...rest } = result
            return { ...rest }
        }
        return undefined
    })
}