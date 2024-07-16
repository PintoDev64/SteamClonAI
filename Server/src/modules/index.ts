import express from 'express';

// Routers
import GameRouter from './game';

const ApplictionRouter = express.Router()

ApplictionRouter.use("/v1", GameRouter)

export default ApplictionRouter