import Database from "..";

type createProfileReviewType = Promise<MethodReturnStructure>
type insertProfileReviewType = Promise<MethodReturnStructure>
type findProfileReviewType = Promise<MethodReturnStructure>

export default class ProfileReviews extends Database {
    constructor() {
        super();
        this.createProfileReview = this.createProfileReview.bind(this);
        this.insertProfileReview = this.insertProfileReview.bind(this);
        this.findProfileReviews = this.findProfileReviews.bind(this);
    }

    public async createProfileReview(data: ProfileReviewsType & IdGameType): createProfileReviewType {
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

    public async insertProfileReview({ data, idGame }: { data: ProfileReviewsType & IdGameType, idGame: string }): insertProfileReviewType {
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

    public async findProfileReviews({ idGame }: { idGame: string }): findProfileReviewType {
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