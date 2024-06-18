import express from 'express'
import PorudzbinaM from '../models/porudzbina';

export class GetWaiterController{

    active_orders = (req: express.Request, res: express.Response)=>{
        PorudzbinaM.find({status: 0}).then((orders)=>{
            res.json(orders)
        }).catch((err)=>{
            console.log(err)
        })
    }

}