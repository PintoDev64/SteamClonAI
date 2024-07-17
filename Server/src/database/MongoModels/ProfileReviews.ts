import { MongoDatabase } from "..";

export default class ProfileReviews extends MongoDatabase {
    private collectionName = "ProfileReviews";
    constructor() {
        super();
        this.createProfileReview = this.createProfileReview.bind(this);
        this.insertProfileReview = this.insertProfileReview.bind(this);
        /* this.findProfileReviews = this.findProfileReviews.bind(this); */
    }

    public async createProfileReview(data: ProfileReviewsType & PublicIdType): GenericClassReturnType {
        try {
            const db = await this.createConnection();
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
            await this.closeConnection();
        }
    }

    public async insertProfileReview({ data, publicId }: { data: ProfileReviewsType & PublicIdType, publicId: string }): GenericClassReturnType {
        try {
            const db = await this.createConnection();
            const collection = db.collection(this.collectionName);

            const result = await collection.findOne({ publicId });

            if (result) {
                const updatedData = [...result.data, data];

                // Actualizamos el documento con el array `data` modificado
                await collection.updateOne(
                    { publicId },
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

    /* public async findProfileReviews({ publicId }: { publicId: string }): findProfileReviewType {
        try {
            const db = await this.createConnection();
            const collection = db.collection(this.collectionName);

            //------> Test - Throw Error

            // throw new Error()

            //------> Test - Throw Error

            const result = await collection.findOne({ publicId })
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
    } */
}