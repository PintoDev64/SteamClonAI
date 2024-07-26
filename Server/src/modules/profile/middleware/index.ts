import { NextFunction, Request, Response } from 'express'
import { randomUUID } from 'crypto';
import { sign } from 'jsonwebtoken'

// Constants
import { JWT_SECRET } from '../../../constants';

type bodyMiddlware = GeneralTypes.UserType & PasswordType

export function createPublicId(request: Request, response: Response, next: NextFunction) {
    const { body }: { body: bodyMiddlware } = request

    const tokenPayload = {
        accountName: body.AccountName,
        mail: body.mail,
        password: body.password
    };
    const passwordPayload = {
        password: body.password
    }
    
    const tokenHash = sign(tokenPayload, JWT_SECRET, { expiresIn: "30d" })
    const passwordHash = sign(passwordPayload, JWT_SECRET, { expiresIn: 7889400000 })

    // @ts-ignore
    body.publicId = randomUUID()
    // @ts-ignore
    body.token = tokenHash
    body.password = passwordHash

    request.body = body
    next()
}