import express from 'express'
import MongoHandler from '../../database/Handlers/MongoHandler'

// Router
const SearchRouter = express.Router()

// Local Constants
const PathService = "/search"

// Collection Name
const collectionName = "GameData"

SearchRouter.get(PathService, async (request, response) => {
    const { QuerySearch } = request.query

    const results = await MongoHandler.Select<GameDataType[]>(collectionName, { name: { $regex: QuerySearch, $options: 'i' } }, true, 5)

    response.json({
        status: 200,
        data: results.map(({ name, idGame, icon }) => { return { name, idGame, icon } })
    });
})

export default SearchRouter