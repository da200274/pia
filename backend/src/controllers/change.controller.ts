import express from 'express'
import KorisnikM from '../models/korisnik';

export class ChangeController{

    change = (req: express.Request, res: express.Response)=>{
    const { podatak, kolona, korime } = req.body;

    if (!podatak || !kolona) {
        return res.status(400).json({ error: 'Kolona i podatak moraju postojati' });
    }

    const update: any = {};
    update[kolona] = podatak;

    KorisnikM.findOneAndUpdate({korime: korime}, update, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json({korisnik:updatedUser, poruka: "ok"});
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });

    }

}