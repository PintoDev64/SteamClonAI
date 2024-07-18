import express from 'express';

// Routers
import GameRouter from './game';
import ProfileRouter from './profile';
import ChatRouter from './chats';

const ApplictionRouter = express.Router()

ApplictionRouter.use("/v1", GameRouter)
ApplictionRouter.use("/v1", ProfileRouter)
ApplictionRouter.use("/v1", ChatRouter)

export default ApplictionRouter