import express from 'express';

// Database Classes
import { getProducts, setProducts, buyProducts, deleteProducts } from '../../database/MysqlModels/Cart';
import { JWT_SECRET } from '../../constants';
import { verify } from 'jsonwebtoken';

// Router
const CartRouter = express.Router()

// Local Constants
const PathService = "/cart"

CartRouter.get(PathService, async (request, response) => {
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
    const data = await getProducts(rest.ACCOUNT_ID)
    response.json(data)
})

CartRouter.put(`${PathService}/add`, async (request, response) => {
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

    const data = await setProducts(rest.ACCOUNT_ID, body.productId)
    response.json(data)
})

CartRouter.put(`${PathService}/remove`, async (request, response) => {
    const { accountId, IdGame } = request.body
    const data = await deleteProducts(accountId, IdGame)
    response.json(data)
})

CartRouter.post(`${PathService}/payment`, async (request, response) => {
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

    const data = await buyProducts(rest.ACCOUNT_ID)
    response.json(data)
})

export default CartRouter