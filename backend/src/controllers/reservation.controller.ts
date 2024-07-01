import express from 'express'
import RezervacijaM from '../models/rezervacija';
import RestoranM from '../models/restoran';

export class ReserveController{

    get_for_date = (req: express.Request, res: express.Response)=>{
        let vreme_start = req.body.datum_vreme;
        let ime = req.body.restoran;

        let vreme_end = new Date(vreme_start)
        vreme_end.setHours(vreme_end.getHours() + 3)

        RezervacijaM.find({ naziv_restorana: ime,
            $or: [ { vreme_pocetka: { $lt: vreme_start } },{ vreme_pocetka: { $gte: vreme_end } }]
        }).then((reservations)=>{
            res.json(reservations)
        }).catch((err)=>{
            console.log(err)
        })
    }

    get_tables = (req: express.Request, res: express.Response)=>{
        let kapacitet = req.body.kapacitet;
        let restoran_ime = req.body.restoran

        RestoranM.findOne({ naziv: restoran_ime }).then((restoran) => {
            if (!restoran) {
                return res.status(404).json({ message: "Restaurant not found" });
            }
    
            let filteredTables = restoran.raspored_stolova.stolovi.filter((sto) => sto.kapacitet >= kapacitet);

            res.json(filteredTables);
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
        });
    }

}