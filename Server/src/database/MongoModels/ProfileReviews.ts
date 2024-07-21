import { FieldPacket } from "mysql2";
import Database from "..";
import { creteNewDate } from "../../utils";
import { GetProfileReviewDef, ProfileReviewsSendStructureType, ProfileReviewsStructureType, ProfileReviewsType } from "./contracts/ProfileReviewContract";



export default class ProfileReviews extends Database {
    private collectionName = "ProfileReviews";
    constructor() {
        super();
        this.createProfileReview = this.createProfileReview.bind(this);
        this.insertProfileReview = this.insertProfileReview.bind(this);
        /* this.findProfileReviews = this.findProfileReviews.bind(this); */
    }

    public async createProfileReview(data: ProfileReviewsType & PublicIdType): GenericClassReturnType {
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

    public async insertProfileReview({ data, publicId }: { data: ProfileReviewsSendStructureType, publicId: string }): GenericClassReturnType {
        try {
            const mysql = await this.createMysqlConnection()
            const mongo = await this.createMongoConnection();
            if (!mongo || !mysql) return { status: "500" }
            const collection = mongo.collection(this.collectionName);

            const result = await collection.findOne({ publicId });

            const [results]: [any, FieldPacket[]] = await mysql.query(
                "SELECT PROFILE_NAME, PROFILE_PICTURE FROM User WHERE PUBLIC_ID = ?",
                [data.publicId]
            )

            if (result) {
                const queryResult: UserTableInterface = results[0]

                const updatedData = [...result.data, {
                    publicId: data.publicId,
                    content: data.content,
                    image: queryResult.PROFILE_PICTURE,
                    username: queryResult.PROFILE_NAME,
                    date: creteNewDate()
                } as ProfileReviewsStructureType];

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
            console.log(err);
            return {
                status: "500"
            };
        } finally {
            await this.closeMysqlConnection();
            await this.closeMongoConnection();
        }
    }

    public async getProfileReviews({ publicId }: GetProfileReviewDef): GenericClassReturnType {
        try {
            const mongo = await this.createMongoConnection();
            if (!mongo) return { status: "500" }
            const collection = mongo.collection(this.collectionName);

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
            await this.closeMongoConnection();
        }
    }
}