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

getRouter.route("/all_restaurants").post(
    (req,res)=>new GetController().all_restaurants(req,res)
)

getRouter.route("/get_restaurant").post(
    (req,res)=>new GetController().get_restaurant(req,res)
)

getRouter.route("/get_active_orders").post(
    (req,res)=>new GetController().get_active_orders(req,res)
)

getRouter.route("/archive").post(
    (req,res)=>new GetController().archive(req,res)
)

export default getRouter;