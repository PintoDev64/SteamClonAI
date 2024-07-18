import express from 'express';

// Database
import GameData from '../../database/MongoModels/GameData';

// Utils
import { HTTPResponses } from '../../utils';
import GameReviews from '../../database/MongoModels/GameReviews';

// Router
const GameRouter = express.Router()

// Database Classes
const { insertGameData, findGameData } = new GameData()
const { insertGameReview, createGameReview } = new GameReviews()

// Local Constants
const PathService = "/game"

// Middleware
import { createIdGame } from './middleware';

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
GameRouter.get(PathService, (request, response) => {
    const { query } = request
    if (query.idGame) {
        findGameData({ idGame: query.idGame as string })
            .then(({ status, data }) => {
                HTTPResponses[status](response, data)
            })
            .catch(err => console.log(err))
    } else {
        response.redirect("https://steam-clon-ai-web.vercel.app/")
    }
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