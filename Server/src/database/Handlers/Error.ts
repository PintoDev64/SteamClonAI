export default class ErrorHandler {
    static async Wrapper<T>(callback: <T>() => T | any | Promise<T> | Promise<any>): DatabaseOperation.GenericClassReturnType {
        try {
            const data = await callback() as T
            return {
                status: data ? 200 : 400,
                data
            }
        } catch (err: any) {
            return {
                status: 500
            }
        }
    }
}