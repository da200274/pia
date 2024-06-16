import express from 'express'
import { GetController } from '../controllers/get.controller'

const getRouter = express.Router()

getRouter.route("/all_active_users").post(
    (req,res)=>new GetController().get_active_users(req,res)
)

getRouter.route("/all_pending_requests").post(
    (req,res)=>new GetController().get_pending_requests(req,res)
)

getRouter.route("/user_by_korime").post(
    (req,res)=>new GetController().user_by_korime(req,res)
)

export default getRouter;