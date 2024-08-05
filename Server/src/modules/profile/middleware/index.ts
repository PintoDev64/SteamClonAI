import { NextFunction, Request, Response } from 'express'
import { randomUUID } from 'crypto';

// Type
type bodyMiddlware = GeneralTypes.UserType & PasswordType & { [K: string]: any }

export function VerifyBodyContent(request: Request, response: Response, next: NextFunction) {
    try {
        const { body }: { body: bodyMiddlware } = request
        const { realName, AccountName, mail, password } = body;

        Object.keys(body).map(value => {
            if (typeof body[value] !== "string") throw new Error(`${value} is not valid`)
        })

        if (realName.length < 12) throw new Error("realName is not valid")
        if (AccountName.length < 6) throw new Error("AccountName is not valid")
        if (!mail.includes("@")) throw new Error("mail is not valid")
        if (password.length < 8) throw new Error("password is not valid")

        next()
    } catch (err: any) {
        console.log(err);
        response.status(404).json({
            status: 500,
            message: err
        })
    }
}

export function createPublicId(request: Request, response: Response, next: NextFunction) {
    const { body }: { body: bodyMiddlware } = request

    body.publicId = randomUUID()

    request.body = body
    next()
}