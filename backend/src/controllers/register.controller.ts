import express from 'express'
import KorisnikM from '../models/korisnik';

export class RegisterController{
    register = async (req: express.Request, res: express.Response)=>{
        let korimeP = req.body.korime;
        let lozinkaP = req.body.lozinka;
        let imeP = req.body.ime;
        let prezimeP = req.body.prezime;
        let pitanjeP = req.body.pitanje;
        let odgovorP = req.body.odgovor;
        let polP = req.body.pol;
        let adresaP = req.body.adresa;
        let kontaktP = req.body.kontakt;
        let imejlP = req.body.imejl;
        let tipP = req.body.tip;
        let profilnaP = req.body.profilna;
        
        let korisnik = {
            korime: korimeP,
            lozinka: lozinkaP, 
            pitanje: pitanjeP, 
            odgovor: odgovorP, 
            ime: imeP, 
            prezime: prezimeP,
            pol: polP, 
            adresa: adresaP,
            kontakt: kontaktP, 
            imejl: imejlP, 
            tip: tipP, 
            profilna: profilnaP, 
            status: 0
        };
        
        const existingUser = await KorisnikM.findOne({
            $or: [
                { korime: korimeP },
                { imejl: imejlP }
            ]
        });

        if (existingUser){
            return res.json({ poruka: "Već postoji korisnik sa tim korisničkim imenom ili email adresom." });
        }

        await new KorisnikM(korisnik).save().then(ok=>{
            res.json({poruka: "ok"})
        }).catch(err=>{
            console.log(err)
        })
    }

    update_photo = async (req: express.Request, res: express.Response)=>{
        let korimeP = req.body.korime
        let profilnaP = req.body.profilna

        KorisnikM.updateOne({korime: korimeP}, {profilna: profilnaP}).then(ok=>{
            res.json({poruka: "ok"})
        }).catch((err)=>{
            console.log(err)
            res.json({poruka: "Fail"})
        })
    }
}