import Database from "..";

export default class GameReviews extends Database {
    private collectionName = "GameReviews";
    constructor() {
        super();
        this.createGameReview = this.createGameReview.bind(this);
        this.insertGameReview = this.insertGameReview.bind(this);
        this.findGameReviews = this.findGameReviews.bind(this);
    }

    public async createGameReview(data: GameReviewsType & IdGameType): GenericClassReturnType {
        try {
            const db = await this.createMongoConnection();
            const collection = db.collection(this.collectionName);

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

    public async insertGameReview({ data, idGame }: { data: GameReviewsType & IdGameType, idGame: string }): GenericClassReturnType {
        try {
            const db = await this.createMongoConnection();
            const collection = db.collection(this.collectionName);

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

    public async findGameReviews({ idGame }: { idGame: string }): GenericClassReturnType {
        try {
            const db = await this.createMongoConnection();
            const collection = db.collection(this.collectionName);

            //------> Test - Throw Error

            // throw new Error()

            //------> Test - Throw Error

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