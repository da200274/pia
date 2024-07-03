import express from 'express'
import { GetWaiterController } from '../controllers/get_waiter.controller'

const getWaiterRouter = express.Router()

getWaiterRouter.route("/active_orders").post(
    (req,res)=>new GetWaiterController().active_orders(req,res)
)

getWaiterRouter.route("/reservations_for_waiter").post(
    (req,res)=>new GetWaiterController().reservations_for_waiter(req,res)
)

export default getWaiterRouter;