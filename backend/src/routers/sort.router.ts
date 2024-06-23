import express from 'express'
import { ChangeController } from '../controllers/change.controller'
import { SortController } from '../controllers/sort.controller';

const sortRouter = express.Router()

sortRouter.route("/sort").post(
    (req,res)=>new SortController().sort(req,res)
)

export default sortRouter;