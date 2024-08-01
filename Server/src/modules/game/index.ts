import express from 'express';

// Database Classes
import { insertGameData, getGameData } from '../../database/MongoModels/GameData';
import { insertGameReview, createGameReview, getGameReviews } from '../../database/MongoModels/GameReviews';

// Utils
import { HTTPResponses } from '../../utils';

// Router
const GameRouter = express.Router()

// Local Constants
const PathService = "/game"

// Middleware
import { createIdGame } from './middleware';
import { GameReviewsAI } from '../../library/OpenAI';

/**
 * Crea un juego
 */
GameRouter.post(PathService, createIdGame, async (request, response) => {
    const { body } = request
    const gameInsert = await insertGameData(body)
    await createGameReview({
        idGame: body.idGame,
        data: []
    })
    response.json(gameInsert)
})

/**
 * 
 */
GameRouter.get(PathService, async (request, response) => {
    const { idGame } = request.query
    if (idGame) {
        const GameData = await getGameData({ idGame: idGame as UUIDPattern })
        const GameReviews = await getGameReviews({ idGame: idGame as UUIDPattern })
        
        response.json({
            ...GameData.data,
            reviews: GameReviews.data
        })
    } else {
        response.redirect("https://steam-clon-ai-web.vercel.app/")
    }
})

GameRouter.post(`${PathService}/steamai`, async (request, response) => {
    const { categories, username, idGame } = request.body

    const { data: GameName } = await getGameData({ idGame }) as { data: GameDataType }
    const GameReviews = await getGameReviews({ idGame: idGame as UUIDPattern }) as GeneralTypes.GameReviewsType

    const FilteredGameReviews = GameReviews.data.map(({ content }) => content).slice(0, 10)

    const Response_AI = await GameReviewsAI(FilteredGameReviews, categories, GameName.name, username)

    response.json({
        Response_AI
    })
})

/**
 * 
 */
GameRouter.put(PathService, (request, response) => {
    const { query, body } = request
    if (query.idGame) {
        insertGameReview({ data: body, idGame: query.idGame as string })
            .then(({ status, data }) => {
                HTTPResponses[status](response, data)
            })
            .catch(err => console.log(err))
    } else {
        response.redirect("https://steam-clon-ai-web.vercel.app/")
    }

})

export default GameRouter