import express from 'express'
import { UpdateController } from '../controllers/update.controller'

const updateRouter = express.Router()

updateRouter.route("/accept_user").post(
    (req,res)=>new UpdateController().accept_user(req,res)
)

updateRouter.route("/reject_user").post(
    (req,res)=>new UpdateController().reject_user(req,res)
)

updateRouter.route("/ban").post(
    (req,res)=>new UpdateController().ban(req,res)
)

updateRouter.route("/change_password").post(
    (req,res)=>new UpdateController().change_password(req,res)
)

updateRouter.route("/accept_offer").post(
    (req,res)=>new UpdateController().accept_offer(req,res)
)

updateRouter.route("/reject_offer").post(
    (req,res)=>new UpdateController().reject_offer(req,res)
)

export default updateRouter;