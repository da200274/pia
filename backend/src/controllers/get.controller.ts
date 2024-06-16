import express from 'express'
import KorisnikM from '../models/korisnik';

export class GetController{

    get_active_users = (req: express.Request, res: express.Response)=>{
        KorisnikM.find({status: 1}).then((users)=>{
            res.json(users)
        }).catch((err)=>{
            console.log(err)
        })
    }

    get_pending_requests = (req: express.Request, res: express.Response)=>{
        KorisnikM.find({status: 0}).then((users)=>{
            res.json(users)
        }).catch((err)=>{
            console.log(err)
        })
    }

    user_by_korime = (req: express.Request, res: express.Response)=>{
        let korime = req.body.korime
        KorisnikM.findOne({korime: korime}).then((user)=>{
            res.json(user)
        }).catch((err)=>{
            console.log(err)
        })
    }
}