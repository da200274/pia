import express from 'express'
import KorisnikM from '../models/korisnik';
import RestoranM from '../models/restoran';
import PorudzbinaM from '../models/porudzbina'
import RezervacijaM from '../models/rezervacija'

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

    archive_orders = (req: express.Request, res: express.Response)=>{
        let korime = req.body.korime
        PorudzbinaM.find({kupac: korime, status: 2})
        .sort({vreme_dostave : -1})
        .then((user)=>{
            res.json(user)
        }).catch((err)=>{
            console.log(err)
        })
    }

    archive_reservations = (req: express.Request, res: express.Response)=>{
        let gost = req.body.gost
        let now = new Date()
        now.setHours(now.getHours() + 2)
        
        RezervacijaM.find({gost: gost, datum_vreme_pocetka: { $lte: now }})
        .sort({datum_vreme_pocetka : -1})
        .then((reservations)=>{
            res.json(reservations)
        }).catch((err)=>{
            console.log(err)
        })
    }

    current_reservations = (req: express.Request, res: express.Response)=>{
        let gost = req.body.gost
        let status = req.body.status
        let now = new Date()
        now.setHours(now.getHours() + 2)
        
        RezervacijaM.find({gost: gost, status: status, datum_vreme_pocetka: { $gt: now }})
        .sort({datum_vreme_pocetka : 1})
        .then((reservations)=>{
            res.json(reservations)
        }).catch((err)=>{
            console.log(err)
        })
    }

    reservations_for_restaurant = (req: express.Request, res: express.Response)=>{
        let naziv = req.body.naziv_restorana
        
        RezervacijaM.find({naziv_restorana: naziv, status: 0})
        .sort({datum_vreme_pocetka : -1})
        .then((reservations)=>{
            res.json(reservations)
        }).catch((err)=>{
            console.log(err)
        })
    }

    count_customers = (req: express.Request, res: express.Response)=>{
        KorisnikM.countDocuments({tip : "musterija"})
        .then((cnt)=>{
            res.json(cnt)
        }).catch((err)=>{
            console.log(err)
        })
    }
}