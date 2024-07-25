import express from 'express';

// Router
const ProfileRouter = express.Router()

// Local Constants
const PathService = "/profile"

// Middleware
import { createPublicId } from './middleware';

// Database Operations
import { createUser, getUser } from '../../database/MysqlModels/User';
import { getPublicLibraryUser } from '../../database/MysqlModels/Library';
import { responseFriendRequest, submitFriendRequest } from '../../database/MysqlModels/Friends';
import { insertProfileReview } from '../../database/MongoModels/ProfileReviews';

/**
 * 
 */
type bodyPOST = GeneralTypes.UserType & PublicIdType & TokenType & PasswordType
ProfileRouter.post(PathService, createPublicId, async (request, response) => {
    const { body }: { body: bodyPOST } = request
    const userCreated = await createUser(body)
    response.json(userCreated)
})

/**
 * 
 */
ProfileRouter.get(`${PathService}/:publicId`, async (request, response)  => {
    const { params } = request
    const users = await getUser({ publicId: params.publicId })
    response.json(users)
})

ProfileRouter.get(`${PathService}/:publicId/games`, async (request, response) => {
    const { params } = request
    const libraryDetails = await getPublicLibraryUser({ publicId: params.publicId })
    response.json(libraryDetails)
})

/**
 * 
 */
type friendRequestType = { From: string }
ProfileRouter.post(`${PathService}/:publicId`, async (request, response)  => {
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
ProfileRouter.post(`${PathService}/:publicId/comment`, async (request, response)  => {
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