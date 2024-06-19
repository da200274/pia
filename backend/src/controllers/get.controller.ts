import express from 'express'
import KorisnikM from '../models/korisnik';
import RestoranM from '../models/restoran';
import PorudzbinaM from '../models/porudzbina'

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

    all_restaurants = (req: express.Request, res: express.Response)=>{
        RestoranM.find().then((rs)=>{
            res.json(rs)
        }).catch((err)=>{
            console.log(err)
        })
    }

    get_restaurant = (req: express.Request, res: express.Response)=>{
        let nazivP = req.body.naziv
        RestoranM.findOne({naziv: nazivP}).then((r)=>{
            res.json(r)
        }).catch((err)=>{
            console.log(err)
        })
    }

    get_active_orders = (req: express.Request, res: express.Response)=>{
        let korime = req.body.korime
        PorudzbinaM.find({kupac: korime, status: 1}).then((user)=>{
            res.json(user)
        }).catch((err)=>{
            console.log(err)
        })
    }

    archive = (req: express.Request, res: express.Response)=>{
        let korime = req.body.korime
        PorudzbinaM.find({kupac: korime, status: 2})
        .sort({vreme_dostave : -1})
        .then((user)=>{
            res.json(user)
        }).catch((err)=>{
            console.log(err)
        })
    }
}