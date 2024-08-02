import { DeleteResult, Document, Filter, UpdateFilter, UpdateResult } from "mongodb";
import { createMongoConnection } from "..";

const mongo = createMongoConnection()

export default class MongoHandler {
    static async Insert(
        Collection: MongoHandlerMethods.ParamCollection,
        Data: MongoHandlerMethods.ParamData
    ) {
        const Database = mongo.collection(Collection)
        if (Data.length === 1) {
            await Database.insertOne(Data[0])
        } else {
            await Database.insertMany(Data, { ordered: true })
        }
        return true
    }

    static async Select<T>(
        Collection: MongoHandlerMethods.ParamCollection,
        Query: MongoHandlerMethods.ParamQuery,
        Many: MongoHandlerMethods.ParamMany = false
    ): Promise<T> {
        console.log(Query);
        
        const Database = mongo.collection(Collection)
        if (Many) {
            console.log("Many: ", await Database.find(Query).toArray() as T);
            return await Database.find(Query).toArray() as T
        }
        console.log("Non-Many:", await Database.findOne(Query) as T);
        return await Database.findOne(Query) as T
    }

    static async Update(
        Collection: MongoHandlerMethods.ParamCollection,
        Query: MongoHandlerMethods.ParamQuery,
        Data: MongoHandlerMethods.ParamUpdateFilter,
        Many?: MongoHandlerMethods.ParamMany | "Repleace"
    ) {
        const Database = mongo.collection(Collection)
        if (Many === true) {
            await Database.updateMany(Query, Data)
        } else if (Many === false) {
            await Database.updateOne(Query, Data[0])
        } else {
            await Database.replaceOne(Query, Data[0])
        }
        return true
    }

    static async Delete(
        Collection: MongoHandlerMethods.ParamCollection,
        Query: MongoHandlerMethods.ParamQuery,
        Many?: MongoHandlerMethods.ParamMany
    ) {
        const Database = mongo.collection(Collection)
        if (Many) {
            await Database.deleteMany(Query)
        } else {
            await Database.deleteOne(Query)
        }
        return true
    }
}

declare namespace MongoHandlerMethods {
    type ParamCollection = string
    type ParamData = Array<any>
    type ParamQuery = Filter<Document>;
    type ParamMany = Boolean;
    type ParamUpdateFilter = UpdateFilter<Document>;
}