import express from 'express'
import { InsertController } from '../controllers/insert.controller'

const insertRouter = express.Router()

insertRouter.route("/order").post(
    (req,res)=>new InsertController().add_order(req,res)
)



export default insertRouter;