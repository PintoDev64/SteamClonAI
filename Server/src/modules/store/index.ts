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
    console.log(Games);
    
    const Response_AI = await StoreRecommendation("Competitivo, Casual, FPS", Games, "PintoGamer")
    const FormatedResponse = JSON.parse(Response_AI.replace(/```json|```/g, '').trim()) as string[]
    console.log(FormatedResponse);
    
    const ResponseValue = (await getGameData({ name: FormatedResponse })).data;
    const GamesOffers = (await getAllGamesOffers()).data
    const GamesFeatured = (await getAllGamesFilter({ limit: 10 })).data
    response.json({
        Featured: GamesFeatured,
        Offers: GamesOffers,
        SteamAI: ResponseValue
    })
})

export default StoreRouter