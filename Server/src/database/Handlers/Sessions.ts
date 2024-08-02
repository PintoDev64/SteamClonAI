import { compare } from "bcrypt";
import MysqlHandler from "./MysqlHandler";
import ErrorHandler from "./Error";

export default class SessionHandler {
    static async Login({ mail, password }: { mail: string, password: string }): Promise<any> {
        return await ErrorHandler.Wrapper(async () => {
            Validate.Mail(mail)
            Validate.Password(password)

            const { MAIL, PASSWORD, CURRENCY, PROFILE_NAME, PROFILE_PICTURE, PUBLIC_ID } = await MysqlHandler.Select("User", ["MAIL", "PASSWORD", "REAL_NAME", "PROFILE_NAME", "PROFILE_PICTURE", "PUBLIC_ID", "CURRENCY"], {
                Where: {
                    Columns: ["MAIL"],
                    Values: [mail]
                }
            })

            if (!MAIL || !PASSWORD) return { status: 404 }

            const HashPassword = await compare(password, PASSWORD)
            if (!HashPassword) return { status: 404 }

            return { PROFILE_NAME, PROFILE_PICTURE, PUBLIC_ID, CURRENCY }
        })
    }
}

export class Validate {
    static Mail(mail: string) {
        if (typeof mail !== "string") return { status: 404 }
        if (mail.includes("@") || mail.length < 10) return { status: 404 }
    }
    static Password(password: string) {
        if (typeof password !== "string") return { status: 404 }
        if (password.length > 8) return { status: 404 }
    }
}