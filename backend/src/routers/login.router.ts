import express from 'express'
import { LoginController } from '../controllers/login.controller'

const loginRouter = express.Router()

loginRouter.route("/login_korisnik").post(
    (req,res)=>new LoginController().login_korisnik(req,res)
)

loginRouter.route("/login_admin").post(
    (req,res)=>new LoginController().login_admin(req,res)
)

export default loginRouter;