import { createMongoConnection } from "..";
import { handleFunction } from "../Handlers/Error";

// Constants
const collectionName = "GameReviews";

export async function createGameReview(data: GameReview.CreateGameReviewParam): DatabaseOperation.GenericClassReturnType {
    return await handleFunction(async () => {
        const mongo = createMongoConnection();
        if (!mongo) return undefined
        const collection = mongo.collection(collectionName);

        await collection.insertOne(data);
        return "Operation Complete"
    })
}

export async function insertGameReview({ data, idGame }: GameReview.InsertGameReviewParams): DatabaseOperation.GenericClassReturnType {
    return await handleFunction(async () => {
        const mongo = createMongoConnection();
        if (!mongo) return undefined
        const collection = mongo.collection(collectionName);

        const result = await collection.findOne({ idGame });

        if (result) {
            const updatedData = [...result.data, data];

            // Actualizamos el documento con el array `data` modificado
            await collection.updateOne(
                { idGame },
                { $set: { data: updatedData } }
            );
            return "Operation Complete"
        }
        return undefined
    })
}

export async function getGameReviews({ idGame }: GameReview.GetGameReviewsParams): DatabaseOperation.GenericClassReturnType {
    return await handleFunction(async () => {
        const mongo = createMongoConnection();
        if (!mongo) return undefined
        const collection = mongo.collection(collectionName);

        const result = await collection.findOne({ idGame })
        if (result) {
            const { _id, ...rest } = result
            return { ...rest }
        }
        return undefined
    })
}