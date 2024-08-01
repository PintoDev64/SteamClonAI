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
import { SALT_ROUNDS } from '../../constants';

/**
 * 
 */
type bodyPOST = GeneralTypes.UserType & PublicIdType & PasswordType
ProfileRouter.post(PathService, VerifyBodyContent, createPublicId, async (request, response) => {
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