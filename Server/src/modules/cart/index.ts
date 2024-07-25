import express from 'express';
import Cart from '../../database/MysqlModels/Cart';

// Router
const CartRouter = express.Router()

// Database Classes
const { getProducts, setProducts, buyProducts } = new Cart()

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