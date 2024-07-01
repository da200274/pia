import express from 'express'
import RezervacijaM from '../models/rezervacija';
import RestoranM from '../models/restoran';

export class ReserveController{

    get_for_date = (req: express.Request, res: express.Response)=>{
        let vreme_start = req.body.datum_vreme;
        let ime = req.body.restoran;

        let vreme_end = new Date(vreme_start)
        vreme_end.setHours(vreme_end.getHours() + 3)


        RezervacijaM.find({ 
            naziv_restorana: ime, 
            datum_vreme_pocetka: { $lte: vreme_end },
            datum_vreme_kraja: { $gte: vreme_start }
        }).then((reservations)=>{
            res.json(reservations)
        }).catch((err)=>{
            console.log(err)
        })

        /*
        $or: [
                 { $and: [
                    {datum_vreme_pocetka: { $lte: vreme_start },
                    datum_vreme_kraja: {$gte: vreme_start}}
                ]},
                { $and: [
                    {datum_vreme_pocetka: { $lte: vreme_end },
                    datum_vreme_kraja: {$gte: vreme_end}}
                ]}
                ]
        */
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