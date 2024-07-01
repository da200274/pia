import express from 'express'
import PorudzbinaM from '../models/porudzbina';
import RestoranM from '../models/restoran'
import RezervacijaM from '../models/rezervacija';

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
        const { naziv, tip, adresa, kratak_opis, kontakt, raspored_stolova, meni, toalet, kuhinja, recenzije, mapa } = req.body;
        const restoran = new RestoranM({
            naziv,
            tip,
            adresa,
            kratak_opis,
            kontakt,
            raspored_stolova,
            toalet,
            kuhinja,
            meni,
            recenzije,
            mapa
        });

        new RestoranM(restoran).save().then(ok=>{
            res.json({poruka: "ok"})
        }).catch(err=>{
            console.log(err)
        })
    }

    add_reservation = (req: express.Request, res: express.Response)=>{
        const { naziv_restorana, gost, datum_vreme_pocetka, sto_id, status, konobar, adresa } = req.body;
        let komentar = ""
        let ocena = 0
        let datum_vreme_kraja = new Date(datum_vreme_pocetka)
        datum_vreme_kraja.setHours(datum_vreme_kraja.getHours() + 3)
        
        const rezervacija = new RezervacijaM({
            naziv_restorana,
            gost,
            konobar,
            sto_id,
            status,
            datum_vreme_pocetka,
            datum_vreme_kraja,
            adresa,
            komentar,
            ocena
        });

        new RezervacijaM(rezervacija).save().then(ok=>{
            res.json({poruka: "ok"})
        }).catch(err=>{
            console.log(err)
        })
    }
}