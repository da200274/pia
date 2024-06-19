import express from 'express'
import PorudzbinaM from '../models/porudzbina';
import RestoranM from '../models/restoran'

export class InsertController{

    add_order = (req: express.Request, res: express.Response)=>{
        let porudzbina = req.body.porudzbina;

        new PorudzbinaM(porudzbina).save().then(ok=>{
            res.json({poruka: "ok"})
        }).catch(err=>{
            console.log(err)
        })
    }

    add_restaurant = (req: express.Request, res: express.Response)=>{
        console.log(req.body)
        const { naziv, tip, adresa, kratak_opis, kontakt, raspored_stolova, meni } = req.body;
        const restoran = new RestoranM({
            naziv,
            tip,
            adresa,
            kratak_opis,
            kontakt,
            raspored_stolova,
            meni
        });

        new RestoranM(restoran).save().then(ok=>{
            res.json({poruka: "ok"})
        }).catch(err=>{
            console.log(err)
        })
    }
}