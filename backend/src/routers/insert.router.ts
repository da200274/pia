import express from 'express'
import { InsertController } from '../controllers/insert.controller'

const insertRouter = express.Router()

insertRouter.route("/order").post(
    (req,res)=>new InsertController().add_order(req,res)
)

insertRouter.route("/restaurant").post(
    (req,res)=>new InsertController().add_restaurant(req,res)
)

insertRouter.route("/reservation").post(
    (req,res)=>new InsertController().add_reservation(req,res)
)

export default insertRouter;