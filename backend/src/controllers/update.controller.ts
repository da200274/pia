import express from 'express'
import KorisnikM from '../models/korisnik';

export class UpdateController{

    accept = (req: express.Request, res: express.Response)=>{
        let korimeP = req.body.korime
        KorisnikM.updateOne({korime: korimeP}, {status: 1}).then((ok)=>{
            res.json({poruka: "ok"})
        }).catch((err)=>{
            console.log(err)
        })
    }

    reject = (req: express.Request, res: express.Response)=>{
        let korimeP = req.body.korime
        KorisnikM.updateOne({korime: korimeP}, {status: 4}).then((ok)=>{
            res.json({poruka: "ok"})
        }).catch((err)=>{
            console.log(err)
        })
    }

    ban = (req: express.Request, res: express.Response)=>{
        let korimeP = req.body.korime
        KorisnikM.updateOne({korime: korimeP}, {status: 2}).then((ok)=>{
            res.json({poruka: "ok"})
        }).catch((err)=>{
            console.log(err)
        })
    }
}