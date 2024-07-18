import express from 'express';
import User from '../../database/MysqlModels/User';
import Friends from '../../database/MysqlModels/Friends';
import ProfileReviews from '../../database/MongoModels/ProfileReviews';

// Router
const ProfileRouter = express.Router()

// Database Classes
const { insertProfileReview } = new ProfileReviews()
const { createUser, getUser } = new User()
const { submitFriendRequest, responseFriendRequest } = new Friends()

// Local Constants
const PathService = "/profile"

// Middleware
import { createPublicId } from './middleware';

/**
 * 
 */
type bodyPOST = UserType & PublicIdType & TokenType & PasswordType
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