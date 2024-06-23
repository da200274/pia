import express from 'express'
import { ChangeController } from '../controllers/change.controller'

const changeRouter = express.Router()

changeRouter.route("/change").post(
    (req,res)=>new ChangeController().change(req,res)
)


export default changeRouter;