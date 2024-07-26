import express from 'express';

// Database Classes
import { getProducts, setProducts, buyProducts } from '../../database/MysqlModels/Cart';

// Router
const CartRouter = express.Router()

// Local Constants
const PathService = "/cart"

CartRouter.post(PathService, async (request, response) => {
    const { body } = request
    const data = await getProducts(body.accountId)
    response.json(data)
})

CartRouter.put(`${PathService}/add`, async (request, response) => {
    const { body } = request
    const data = await setProducts(body.accountId, body.productId)
    response.json(data)
})

CartRouter.post(`${PathService}/payment`, async (request, response) => {
    const { body } = request
    const data = await buyProducts(body.accountId)
    response.json(data)
})

export default CartRouter