import express from 'express';
import { hashSync } from 'bcrypt'
import { sign, verify } from 'jsonwebtoken';
import multer from 'multer'

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

const upload = multer()

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
    response.json({ userCreated })
})

/**
 * 
 */
ProfileRouter.get(`${PathService}/close`, (request, response) => {
    response
    .clearCookie("userUniqueToken", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "none", partitioned: true })
    .status(200)
    .json({ status: 200 })
})

/**
 * 
 */
ProfileRouter.post(`${PathService}/verify`, async (request, response) => {

    const Token = request.cookies.userUniqueToken

    console.log(Token);

    try {
        if (!Token) return response.json({ status: 401 })

        const { exp, iat, ...rest } = verify(Token, JWT_SECRET) as {
            exp: number,
            iat: number,
            CURRENCY: number,
            PROFILE_NAME: string,
            PROFILE_PICTURE: number,
            PUBLIC_ID: string
        }

        response.json(rest)
    } catch (err: any) {
        console.log(err);
        response.json({ status: 500 })
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

ProfileRouter.put(`${PathService}/login`, upload.none(), async (request, response) => {
    try {
        const { mail, password } = request.body;

        const { data } = await SessionHandler.Login({ mail, password });
        const token = sign(data, JWT_SECRET, { expiresIn: 7 * 24 * 60 * 60 * 1000 });

        console.log(data);

        console.log(token);

        response
            .cookie("userUniqueToken", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "none", partitioned: true })
            .json({
                Name: data.PROFILE_NAME,
                Picture: data.PROFILE_PICTURE,
                Currency: data.CURRENCY,
                PublicId: data.PUBLIC_ID
            });
    } catch (error) {
        console.error('Error in login route:', error);
        response.status(500).json({ error: "Internal Server Error" });
    }
})

export default ProfileRouter