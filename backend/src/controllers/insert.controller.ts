import express from 'express'
import PorudzbinaM from '../models/porudzbina';

export class InsertController{

    add_order = (req: express.Request, res: express.Response)=>{
        let porudzbina = req.body.porudzbina;

        new PorudzbinaM(porudzbina).save().then(ok=>{
            res.json({poruka: "ok"})
        }).catch(err=>{
            console.log(err)
        })
    }
}