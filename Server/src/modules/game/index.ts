import express from 'express';
import { randomUUID } from 'node:crypto'

// Database
import GameData from '../../database/models/GameData';

const GameRouter = express.Router()

const { insertGameData, findGameData } = new GameData()

const PathService = "/game"

GameRouter.post(PathService, async (request, response) => {
    response.json({
        operation: "insertGameData",
        status: 200
    })
    response.json(await insertGameData(JSON.parse(request.body)))
})

GameRouter.get(`${PathService}/:idGame`, async (request, response) => {
    const { params } = request
    response.json(await findGameData({ idGame: params.idGame }))
})

export default GameRouter