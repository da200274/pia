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

updateRouter.route("/unblock").post(
    (req,res)=>new UpdateController().unblock(req,res)
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

updateRouter.route("/deliver_order").post(
    (req,res)=>new UpdateController().deliver_order(req,res)
)

updateRouter.route("/reviewed").post(
    (req,res)=>new UpdateController().review(req,res)
)

updateRouter.route("/reject_reservation").post(
    (req,res)=>new UpdateController().reject_reservation(req,res)
)

updateRouter.route("/accept_reservation").post(
    (req,res)=>new UpdateController().accept_reservation(req,res)
)

updateRouter.route("/valid_reservation").post(
    (req,res)=>new UpdateController().valid_reservation(req,res)
)

updateRouter.route("/invalid_reservation").post(
    (req,res)=>new UpdateController().invalid_reservation(req,res)
)


export default updateRouter;