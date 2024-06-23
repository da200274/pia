import express from 'express'
import { SearchController } from '../controllers/search.router';

const searchRouter = express.Router()

searchRouter.route("/search").post(
    (req,res)=>new SearchController().search(req,res)
)

export default searchRouter;