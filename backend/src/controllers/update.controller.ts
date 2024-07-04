import express from 'express'
import KorisnikM from '../models/korisnik';
import PorudzbinaM from '../models/porudzbina'
import RezervacijaM from '../models/rezervacija'

export class UpdateController{

    accept_user = (req: express.Request, res: express.Response)=>{
        let korimeP = req.body.korime
        KorisnikM.updateOne({korime: korimeP}, {status: 1}).then((ok)=>{
            res.json({poruka: "ok"})
        }).catch((err)=>{
            console.log(err)
        })
    }

    reject_user = (req: express.Request, res: express.Response)=>{
        let korimeP = req.body.korime
        KorisnikM.updateOne({korime: korimeP}, {status: 4}).then((ok)=>{
            res.json({poruka: "ok"})
        }).catch((err)=>{
            console.log(err)
        })
    }

    ban = (req: express.Request, res: express.Response)=>{
        let korimeP = req.body.korime
        KorisnikM.updateOne({korime: korimeP}, {status: 2}).then((ok)=>{
            res.json({poruka: "ok"})
        }).catch((err)=>{
            console.log(err)
        })
    }

    change_password = (req: express.Request, res: express.Response)=>{
        let korimeP = req.body.korime
        let lozinkaP = req.body.lozinka
        KorisnikM.updateOne({korime: korimeP}, {lozinka: lozinkaP}).then((ok)=>{
            res.json({poruka: "ok"})
        }).catch((err)=>{
            console.log(err)
        })
    }

    accept_offer = (req: express.Request, res: express.Response)=>{
        let korimeP = req.body.korime
        let idP = req.body.id
        let vremeP = req.body.vreme_dostave
        PorudzbinaM.updateOne({_id: idP}, {status: 1, konobar: korimeP, vreme_dostave: vremeP}).then((ok)=>{
            res.json({poruka: "ok"})
        }).catch((err)=>{
            console.log(err)
        })
    }

    reject_offer = (req: express.Request, res: express.Response)=>{
        let idP = req.body.id
        PorudzbinaM.deleteOne({_id: idP}).then((ok)=>{
            res.json({poruka: "ok"})
        }).catch((err)=>{
            console.log(err)
        })
    }

    deliver_order = (req: express.Request, res: express.Response)=>{
        let idP = req.body.id
        PorudzbinaM.updateOne({_id: idP}, {status: 2}).then((ok)=>{
            res.json({poruka: "ok"})
        }).catch((err)=>{
            console.log(err)
        })
    }

    review = (req: express.Request, res: express.Response)=>{
        let idR = req.body.id
        let komentar = req.body.komentar
        let ocena = req.body.ocena
        RezervacijaM.updateOne({_id: idR}, { komentar: komentar, ocena: ocena}).then((ok)=>{
            res.json({poruka: "ok"})
        }).catch((err)=>{
            console.log(err)
        })
    }

    accept_reservation = (req: express.Request, res: express.Response)=>{
        let idR = req.body.id
        let sto_id = req.body.sto
        let konobar = req.body.konobar
        RezervacijaM.updateOne({_id: idR}, { sto_id: sto_id, status: 1, konobar: konobar}).then((ok)=>{
            res.json({poruka: "ok"})
        }).catch((err)=>{
            console.log(err)
        })
    }

    reject_reservation = (req: express.Request, res: express.Response)=>{
        let idR = req.body.id
        let komentar = req.body.komentar
        RezervacijaM.updateOne({_id: idR}, { status: -1}).then((ok)=>{
            res.json({poruka: "ok"})
        }).catch((err)=>{
            console.log(err)
        })
    }

    valid_reservation = (req: express.Request, res: express.Response)=>{
        let idR = req.body.id
        RezervacijaM.updateOne({_id: idR}, { status: 2}).then((ok)=>{
            res.json({poruka: "ok"})
        }).catch((err)=>{
            console.log(err)
        })
    }

    invalid_reservation = async (req: express.Request, res: express.Response)=>{
        try{
            let idR = req.body.id
            let korime = req.body.korime
            await RezervacijaM.updateOne({_id: idR}, { status: 3})
            const user = await KorisnikM.findOneAndUpdate(
                {korime: korime},
                {$inc: {nedolazak: 1}},
                {new: true}
            );

            if (user?.nedolazak && user.nedolazak >= 3) {
                await KorisnikM.updateOne({korime: korime}, {status: 5});
            }

            res.json({poruka: "ok"});
        } catch (err) {
            console.log(err);
            res.status(500).json({poruka: "error", error: err});
        }
    }
}