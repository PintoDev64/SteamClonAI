import { HTTPResponses } from "../../utils";

export async function handleFunction<T>(callback: <T>() => T | any | Promise<T> | Promise<any>): DatabaseOperation.GenericClassReturnType {
    try {
        const value = await callback<T>() 
        if (value) {
            return {
                status: "200",
                data: value
            }
        }
        return {
            status: "404"
        }
    } catch (err: any) {
        console.log(err);
        return {
            status: "500"
        }
    }
}