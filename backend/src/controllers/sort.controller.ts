import express from 'express'
import RestoranM from '../models/restoran';

export class SortController{

    sort = async (req: express.Request, res: express.Response)=>{
        let kolona = req.body.kolona
        let direction = req.body.direction

        const sortColumn = kolona || 'naziv';
        const sortDirection = direction === 'desc' ? -1 : 1;

        const restaurants = await RestoranM.find().sort({ [sortColumn]: sortDirection });

        res.status(200).json(restaurants);
    }

}