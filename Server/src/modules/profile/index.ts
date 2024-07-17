import express, { NextFunction, Request, Response } from 'express';
import { sign } from 'jsonwebtoken'
import User from '../../database/MysqlModels/User';
import { JWT_SECRET } from '../../constants';
import { randomUUID } from 'crypto';

// Router
const ProfileRouter = express.Router()

// Database Classes
const { createUser } = new User()

// Local Constants
const PathService = "/profile"

// Middleware
type bodyMiddlware = UserType & PasswordType
function createPublicId(request: Request, response: Response, next: NextFunction) {
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

/**
 * 
 */
type bodyPOST = UserType & PublicIdType & TokenType & PasswordType
ProfileRouter.post(PathService, createPublicId, async (request, response) => {
    const { body }: { body: bodyPOST } = request
    const userCreated = await createUser(body)
    response.json(userCreated)
})

export default ProfileRouter