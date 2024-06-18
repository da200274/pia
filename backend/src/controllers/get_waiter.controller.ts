import express from 'express'
import PorudzbinaM from '../models/porudzbina';

export class GetWaiterController{

    active_orders = (req: express.Request, res: express.Response)=>{
        let radi_u = req.body.radi_u;
        PorudzbinaM.find({status: 0, naziv: radi_u}).then((orders)=>{
            res.json(orders)
        }).catch((err)=>{
            console.log(err)
        })
    }

}