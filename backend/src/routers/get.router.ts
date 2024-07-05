import express from 'express'
import { GetController } from '../controllers/get.controller'

const getRouter = express.Router()

getRouter.route("/all_active_users").post(
    (req,res)=>new GetController().get_active_users(req,res)
)

getRouter.route("/all_pending_requests").post(
    (req,res)=>new GetController().get_pending_requests(req,res)
)

getRouter.route("/all_waiters").post(
    (req,res)=>new GetController().all_waiters(req,res)
)

getRouter.route("/all_waiters_from_restaurant").post(
    (req,res)=>new GetController().all_waiters_from_restaurant(req,res)
)

getRouter.route("/guests_for_waiter").post(
    (req,res)=>new GetController().guests_for_waiter(req,res)
)

getRouter.route("/user_by_korime").post(
    (req,res)=>new GetController().user_by_korime(req,res)
)

getRouter.route("/all_restaurants").post(
    (req,res)=>new GetController().all_restaurants(req,res)
)

getRouter.route("/2y").post(
    (req,res)=>new GetController().all_reservations(req,res)
)

getRouter.route("/get_restaurant").post(
    (req,res)=>new GetController().get_restaurant(req,res)
)

getRouter.route("/get_active_orders").post(
    (req,res)=>new GetController().get_active_orders(req,res)
)

getRouter.route("/archive_orders").post(
    (req,res)=>new GetController().archive_orders(req,res)
)

getRouter.route("/archive_reservations").post(
    (req,res)=>new GetController().archive_reservations(req,res)
)

getRouter.route("/current_reservations").post(
    (req,res)=>new GetController().current_reservations(req,res)
)

getRouter.route("/reservations_for_restaurant").post(
    (req,res)=>new GetController().reservations_for_restaurant(req,res)
)

getRouter.route("/count_customers").post(
    (req,res)=>new GetController().count_customers(req,res)
)

export default getRouter;