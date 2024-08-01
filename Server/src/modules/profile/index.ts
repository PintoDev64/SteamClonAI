import express from 'express';
import { hashSync } from 'bcrypt'

// Router
const ProfileRouter = express.Router()

// Local Constants
const PathService = "/profile"

// Middleware
import { createPublicId, VerifyBodyContent } from './middleware';

// Database Operations
import { createUser, getUser } from '../../database/MysqlModels/User';
import { getLibraryUser } from '../../database/MysqlModels/Library';
import { responseFriendRequest, submitFriendRequest } from '../../database/MysqlModels/Friends';
import { insertProfileReview } from '../../database/MongoModels/ProfileReviews';
import { JWT_SECRET, SALT_ROUNDS } from '../../constants';
import SessionHandler from '../../database/Handlers/Sessions';
import { sign, verify } from 'jsonwebtoken';

/**
 * 
 */
type bodyPOST = GeneralTypes.UserType & PublicIdType & PasswordType
ProfileRouter.post(`${PathService}/register`, VerifyBodyContent, createPublicId, async (request, response) => {
    const { body }: { body: bodyPOST } = request

    const RequestData: bodyPOST = {
        mail: body.mail,
        publicId: body.publicId,
        realName: body.realName,
        AccountName: body.AccountName.toLowerCase(),
        password: hashSync(body.password, SALT_ROUNDS),
        profileName: body.AccountName,
        status: "Offline",
        vacStatus: 1,
        backgroundImage: 1,
        profilePicture: 1,
        theme: 1,
    }

    const userCreated = await createUser(RequestData)
    response.json(userCreated)
})

ProfileRouter.post(`${PathService}/login`, async (request, response) => {
    const { mail, password } = request.body

    const data = await SessionHandler.Login({ mail, password })
    const token = sign(data, JWT_SECRET, { expiresIn: '7d' })

    response
        .cookie("userUniqueToken", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" })
        .json(data)
})

ProfileRouter.post(`${PathService}/verify`, async (request, response) => {
    try {
        const token = request.cookies.userUniqueToken

        if (!token) return response.json({ status: 401 })

        const data = verify(token, JWT_SECRET)
        console.log(data);
        response.json(data)
    } catch (err: any) {
        console.log(err);
        response.json({ status: 401 })
    }

})

/**
 * 
 */
ProfileRouter.get(`${PathService}/:publicId`, async (request, response) => {
    const { params } = request
    const users = await getUser({ publicId: params.publicId })
    response.json(users)
})

ProfileRouter.get(`${PathService}/:publicId/games`, async (request, response) => {
    const { params } = request
    const libraryDetails = await getLibraryUser({ publicId: params.publicId })
    response.json(libraryDetails)
})

/**
 * 
 */
type friendRequestType = { From: string }
ProfileRouter.post(`${PathService}/:publicId`, async (request, response) => {
    const { body, params }: { body: friendRequestType, params: { publicId: string } } = request
    const relation = await submitFriendRequest({
        friendOne: body.From,
        friendTwo: params.publicId
    })
    response.json(relation)
})

/**
 * 
 */
type ProfileReviewsSendStructureType = { publicId: string, content: string }
ProfileRouter.post(`${PathService}/:publicId/comment`, async (request, response) => {
    const { body, params }: { body: ProfileReviewsSendStructureType, params: { publicId: string } } = request
    const comment = await insertProfileReview({
        data: body,
        publicId: params.publicId
    })
    response.json(comment)
})

/**
 * 
 */
type Confirmation = { responseFriend: boolean, publicId: string }
ProfileRouter.post(`${PathService}/:publicId/confirmation`, async (request, response) => {
    const { body, params } = request;
    const { publicId, responseFriend }: Confirmation = body;

    const FriendRequet = await responseFriendRequest({
        response: responseFriend,
        requestFriend: params.publicId,
        yourPublicId: publicId
    })
    response.json(FriendRequet)
})

export default ProfileRouter