import Database from "..";
import { CreateGameReviewParam, GameReviewContract, GetGameReviewsParams, InsertGameReviewParams } from "./contracts/GameReviewContract";

export default class GameReviews extends Database implements GameReviewContract {
    private collectionName = "GameReviews";
    constructor() {
        super();
        this.createGameReview = this.createGameReview.bind(this);
        this.insertGameReview = this.insertGameReview.bind(this);
        this.getGameReviews = this.getGameReviews.bind(this);
    }

    public async createGameReview(data: CreateGameReviewParam): GenericClassReturnType {
        try {
            const mongo = await this.createMongoConnection();
            if (!mongo) return { status: "500" }
            const collection = mongo.collection(this.collectionName);

            await collection.insertOne(data);
            return {
                status: "200",
                data: "Operation Complete"
            };
        } catch (err: any) {
            return {
                status: "500"
            };
        } finally {
            await this.closeMongoConnection();
        }
    }

    public async insertGameReview({ data, idGame }: InsertGameReviewParams): GenericClassReturnType {
        try {
            const mongo = await this.createMongoConnection();
            if (!mongo) return { status: "500" }
            const collection = mongo.collection(this.collectionName);

            const result = await collection.findOne({ idGame });

            if (result) {
                const updatedData = [...result.data, data];

                // Actualizamos el documento con el array `data` modificado
                await collection.updateOne(
                    { idGame },
                    { $set: { data: updatedData } }
                );
                return {
                    status: "200",
                    data: "Operation Complete"
                };
            } else {
                return {
                    status: "404",
                }
            }
        } catch (err: any) {
            return {
                status: "500"
            };
        } finally {
            await this.closeMongoConnection();
        }
    }

    public async getGameReviews({ idGame }: GetGameReviewsParams): GenericClassReturnType {
        try {
            const mongo = await this.createMongoConnection();
            if (!mongo) return { status: "500" }
            const collection = mongo.collection(this.collectionName);

            const result = await collection.findOne({ idGame })
            if (result) {
                const { _id, ...rest } = result
                return {
                    status: "200",
                    data: { ...rest }
                }
            } else {
                return {
                    status: "404"
                }
            }
        } catch (err: any) {
            return {
                status: "500"
            };
        } finally {
            await this.closeMongoConnection();
        }
    }
}