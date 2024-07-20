import express from 'express';

// Routers
import GameRouter from './game';
import ProfileRouter from './profile';

const ApplictionRouter = express.Router()

ApplictionRouter.use("/v1", GameRouter)
ApplictionRouter.use("/v1", ProfileRouter)

export default ApplictionRouter