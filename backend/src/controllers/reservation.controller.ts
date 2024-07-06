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
            status: { $in: [1, 2] },
            datum_vreme_pocetka: { $lte: vreme_end },
            datum_vreme_kraja: { $gte: vreme_start }
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

    get_last_day = (req: express.Request, res: express.Response)=>{
        let last_day = new Date()
        last_day.setDate(last_day.getDate() - 1);
        
        RezervacijaM.countDocuments({ kreirana_u: { $gte: last_day } }).then((cnt) => {
            res.json(cnt);
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
        });
    }

    get_last_week = (req: express.Request, res: express.Response)=>{
        let last_week = new Date()
        last_week.setDate(last_week.getDate() - 7);
        
        RezervacijaM.countDocuments({ kreirana_u: { $gte: last_week } }).then((cnt) => {
            res.json(cnt);
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
        });
    }

    get_last_month = (req: express.Request, res: express.Response)=>{
        let last_month = new Date()
        last_month.setMonth(last_month.getMonth() - 1);
        
        RezervacijaM.countDocuments({ kreirana_u: { $gte: last_month } }).then((cnt) => {
            res.json(cnt);
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
        });
    }

}