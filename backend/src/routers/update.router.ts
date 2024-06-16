import express from 'express'
import { UpdateController } from '../controllers/update.controller'

const updateRouter = express.Router()

updateRouter.route("/accept").post(
    (req,res)=>new UpdateController().accept(req,res)
)

updateRouter.route("/reject").post(
    (req,res)=>new UpdateController().reject(req,res)
)

updateRouter.route("/ban").post(
    (req,res)=>new UpdateController().ban(req,res)
)

export default updateRouter;