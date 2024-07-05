import express from 'express'
import PutnikM from '../models/korisnik'

function incrementCharacters(str: string) {
    return str.split('').map(char => {
      let code = char.charCodeAt(0);
      let shiftedCode = code + 1;
      return String.fromCharCode(shiftedCode);
    }).join('');
}

export class LoginController{
    login_korisnik = (req: express.Request, res: express.Response)=>{
        let korimeP = req.body.korime;
        let lozinkaP = req.body.lozinka;

        lozinkaP = incrementCharacters(lozinkaP)
        PutnikM.findOne({korime: korimeP, lozinka: lozinkaP, status: 1}).then((user)=>{
            res.json(user)
        }).catch((err)=>{
            console.log(err)
        })
    }

    login_admin = (req: express.Request, res: express.Response)=>{
        let korimeP = req.body.korime;
        let lozinkaP = req.body.lozinka;

        lozinkaP = incrementCharacters(lozinkaP)

        PutnikM.findOne({korime: korimeP, lozinka: lozinkaP, status: 3}).then((user)=>{
            res.json(user)
        }).catch((err)=>{
            console.log(err)
        })
    }

    /*usluge = (req: express.Request, res: express.Response)=>{
        let usernameP = req.body.username;

        AgencijaM.findOne({korisnickoIme: usernameP}).then((user)=>{
            res.json(user)
        }).catch((err)=>{
            console.log(err)
        })
  
    }

    lista = (req: express.Request, res: express.Response)=>{
        let usernameP = req.body.username;

        PutnikM.findOne({korisnickoIme: usernameP}).then((user)=>{
            res.json(user)
        }).catch((err)=>{
            console.log(err)
        })
  
    }

    pretraga = (req: express.Request, res: express.Response)=>{
        let dest = req.body.destinacija
        let cena_od = req.body.cena_od
        let cena_do = req.body.cena_do
        let tip1 = req.body.tip1
        let tip2 = req.body.tip2
        let tip3 = req.body.tip3
        let rezultat = [];

        const query: { [key: string]: any } = { 'usluge.cena' : { $gte: cena_od } };

        if (dest != "") {
            query['usluge.lokacija_do'] = { $regex: dest };
        }
        if(cena_do > 0){
            query['usluge.cena'] = {$lt : cena_do}
        }



        AgencijaM.find(query).then(nesto=>{
            res.json(nesto)
        }).catch((err)=>{
            console.log(err)
        })


    }

    detalji = (req: express.Request, res: express.Response)=>{
        PutnikM.find()
            .populate({
                path: 'lista.idusluge',
                select: 'lokacija_od lokacija_do tip', // Assuming these are the fields you want to select
                options: {
                    match: {
                        'lista.idusluge': '$usluge.idponude'
                    }
                }
            }).then(putnici => {
                console.log(putnici);
                res.json(putnici)
            });
    }

    dodaj_uslugu = (req: express.Request, res: express.Response)=>{

        let ime = req.body.ime
        let usluga = {
            tip_usluge : req.body.tip_usluge,
            lokacija_do : req.body.lokacija_do,
            lokacija_od : req.body.lokacija_od,
            cena : req.body.cena,
            period : req.body.period,
            broj_mesta : req.body.broj_mesta
        }

        AgencijaM.updateOne({korisnickoIme: ime}, {$push : {usluge: usluga}}).then(data=>{
            res.json("ok");
        }).catch((err)=>{
            console.log(err)
        })
    }*/
}