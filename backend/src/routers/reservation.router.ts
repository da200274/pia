import express from 'express'
import { ReserveController } from '../controllers/reservation.controller'

const reserveRouter = express.Router()

reserveRouter.route("/get_for_date").post(
    (req,res)=>new ReserveController().get_for_date(req,res)
)

reserveRouter.route("/get_table").post(
    (req,res)=>new ReserveController().get_tables(req,res)
)

reserveRouter.route("/get_last_day").post(
    (req,res)=>new ReserveController().get_last_day(req,res)
)

reserveRouter.route("/get_last_week").post(
    (req,res)=>new ReserveController().get_last_week(req,res)
)

reserveRouter.route("/get_last_month").post(
    (req,res)=>new ReserveController().get_last_month(req,res)
)


export default reserveRouter;