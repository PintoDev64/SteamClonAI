import express from 'express';

// Database
import GameData from '../../database/models/GameData';

// Constants
import { DEFAULT_404, DEFAULT_500 } from '../../constants';

// Router
const GameRouter = express.Router()

// Database Classes
const { insertGameData, findGameData } = new GameData()

// Local Constants
const PathService = "/game"

/**
 * 
 */
GameRouter.post(PathService, async (request, response) => {
    response.json({
        operation: "insertGameData",
        status: 200
    })
    response.json(await insertGameData(JSON.parse(request.body)))
})

/**
 * 
 */
GameRouter.get(PathService, async (request, response) => {
    const { query } = request
    if (query.idGame) {
        findGameData({ idGame: query.idGame as string })
        .then(({ status, data }) => {
            if (status === 200) {
                response.json(data)
            } else if (status === 404) {
                response.json(DEFAULT_404)
            } else if (status === 500) {
                response.json(DEFAULT_500)
            } else if (status === 302) {
                response.redirect("https://steam-clon-ai-web.vercel.app/")
            }
        })
        .catch(err => console.log(err))
    } else {
        response.redirect("https://steam-clon-ai-web.vercel.app/")
    }
})

export default GameRouter