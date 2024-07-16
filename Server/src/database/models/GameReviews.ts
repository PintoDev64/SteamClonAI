import Database from "..";

type createGameReviewType = Promise<MethodReturnStructure>
type insertGameReviewType = Promise<MethodReturnStructure>
type findGameReviewType = Promise<MethodReturnStructure>

export default class GameReviews extends Database {
    constructor() {
        super();
        this.createGameReview = this.createGameReview.bind(this);
        this.insertGameReview = this.insertGameReview.bind(this);
        this.findGameReviews = this.findGameReviews.bind(this);
    }

    public async createGameReview(data: GameReviewsType & IdGameType): createGameReviewType {
        try {
            const db = await this.createConnection();
            const collection = db.collection('GameReviews');

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
            await this.closeConnection();
        }
    }

    public async insertGameReview({ data, idGame }: { data: GameReviewsType & IdGameType, idGame: string }): insertGameReviewType {
        try {
            const db = await this.createConnection();
            const collection = db.collection('GameReviews');

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
            await this.closeConnection();
        }
    }

    public async findGameReviews({ idGame }: { idGame: string }): findGameReviewType {
        try {
            const db = await this.createConnection();
            const collection = db.collection('GameReviews');

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
            await this.closeConnection();
        }
    }
}