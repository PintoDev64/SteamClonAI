import express from 'express'
import { StoreRecommendation } from '../../library/OpenAI'
import { getAllGameNames, getAllGamesFilter, getAllGamesOffers, getGameData } from '../../database/MongoModels/GameData'

// Ai Library

// Router
const StoreRouter = express.Router()

// Local Constants
const PathService = "/store"

StoreRouter.get(PathService, async (request, response) => {
    const Games = (await getAllGameNames()).data;

    const Response_AI = await StoreRecommendation("Competitivo, Casual, FPS", Games, "PintoGamer")

    const FormatedResponse = JSON.parse(Response_AI.replace(/```json|```/g, '').trim()) as string[]

    const ResponseValue = await getGameData({ name: FormatedResponse });
    const GamesOffers = await getAllGamesOffers()
    const GamesFeatured = await getAllGamesFilter({ limit: 10 })

    response.json({
        Featured: GamesFeatured.data,
        Offers: GamesOffers.data,
        SteamAI: ResponseValue.data
    })
})

export default StoreRouter