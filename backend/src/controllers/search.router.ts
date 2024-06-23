import express from 'express'
import RestoranM from '../models/restoran';

interface SearchParams {
    naziv?: string;
    adresa?: string;
    tip?: string;
  }

export class SearchController{

    search = async (req: express.Request, res: express.Response)=>{
        const { naziv, adresa, tip } = req.body;

        let query: Partial<SearchParams> = {};
        if (naziv) query.naziv = naziv;
        if (adresa) query.adresa = adresa;
        if (tip) query.tip = tip;

        const restaurants = await RestoranM.find(query);

        res.status(200).json(restaurants);
    }

}