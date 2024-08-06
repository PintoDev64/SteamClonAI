import express from 'express'
import { verify } from 'jsonwebtoken'
import { JWT_SECRET } from '../../constants'
import { deleteWishlist, getWishlist, setWishlist } from '../../database/MysqlModels/Wishlist'

// Router
const WishlistRouter = express.Router()

// Local Constants
const PathService = "/wishlist"

WishlistRouter.get(PathService, async (request, response) => {
    const Token = request.cookies.userUniqueToken

    if (!Token) return response.json({ status: 401 })

    const { exp, iat, ...rest } = verify(Token, JWT_SECRET) as {
        exp: number,
        iat: number,
        PROFILE_NAME: string,
        PROFILE_PICTURE: number,
        ACCOUNT_ID: number,
        PUBLIC_ID: string
    }

    const data = await getWishlist(rest.PUBLIC_ID)
    response.json(data)
})

WishlistRouter.post(`${PathService}/add`, async (request, response) => {
    const Token = request.cookies.userUniqueToken
    const { body } = request

    if (!Token) return response.json({ status: 401 })

    const { exp, iat, ...rest } = verify(Token, JWT_SECRET) as {
        exp: number,
        iat: number,
        PROFILE_NAME: string,
        PROFILE_PICTURE: number,
        ACCOUNT_ID: number,
        PUBLIC_ID: string
    }

    const data = await setWishlist(rest.PUBLIC_ID, body.productId)
    response.json(data)
})

WishlistRouter.put(`${PathService}/remove`, async (request, response) => {
    const Token = request.cookies.userUniqueToken
    const { IdGame } = request.body

    if (!Token) return response.json({ status: 401 })

    const { exp, iat, ...rest } = verify(Token, JWT_SECRET) as {
        exp: number,
        iat: number,
        PROFILE_NAME: string,
        PROFILE_PICTURE: number,
        ACCOUNT_ID: number,
        PUBLIC_ID: string
    }

    const data = await deleteWishlist(rest.PUBLIC_ID, IdGame)
    response.json(data)
})

export default WishlistRouter