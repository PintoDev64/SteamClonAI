import express from 'express';

// Routers
import GameRouter from './game';
import ProfileRouter from './profile';
import CartRouter from './cart';
import StoreRouter from './store';

const ApplictionRouter = express.Router()

ApplictionRouter.use("/v1", GameRouter)
ApplictionRouter.use("/v1", ProfileRouter)
ApplictionRouter.use("/v1", CartRouter)
ApplictionRouter.use("/v1", StoreRouter)

export default ApplictionRouter