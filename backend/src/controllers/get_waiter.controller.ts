import express from 'express'
import PorudzbinaM from '../models/porudzbina';
import RezervacijaM from '../models/rezervacija'

export class GetWaiterController{

    active_orders = (req: express.Request, res: express.Response)=>{
        let radi_u = req.body.radi_u;
        PorudzbinaM.find({status: 0, naziv: radi_u}).then((orders)=>{
            res.json(orders)
        }).catch((err)=>{
            console.log(err)
        })
    }

    reservations_for_waiter = (req: express.Request, res: express.Response)=>{
        let konobar = req.body.konobar
        
        RezervacijaM.find({konobar: konobar, status: 1})
        .then((reservations)=>{
            res.json(reservations)
        }).catch((err)=>{
            console.log(err)
        })
    }

    current_reservation = (req: express.Request, res: express.Response)=>{
        let konobar = req.body.konobar
        let now = new Date()
        
        RezervacijaM.find({konobar: konobar, status: 2, datum_vreme_kraja: { $gte: now }})
        .then((reservations)=>{
            res.json(reservations)
        }).catch((err)=>{
            console.log(err)
        })
    }

}