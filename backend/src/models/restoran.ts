import mongoose from 'mongoose'

const stoSchema = new mongoose.Schema(
    {
        sto_id: String,
        kapacitet: Number
    }
);

const rasporedSchema = new mongoose.Schema(
    {
        radno_vreme: String,
        stolovi: [stoSchema]
    }
);

const meniSchema = new mongoose.Schema(
    {
        naziv: String,
        slika: String,
        cena: Number,
        sastojci: String
    }
);

const recenzijaSchema = new mongoose.Schema(
    {
        ocena: Number,
        komentar: String
    }
);

const restoranSchema = new mongoose.Schema(
    {
        naziv: String,
        tip: String,
        adresa: String,
        kratak_opis: String,
        mapa: String,
        kontakt: String,
        raspored_stolova: rasporedSchema,
        meni: [meniSchema],
        recenzije: [recenzijaSchema]
    }
);

export default mongoose.model('RestoranM', restoranSchema, 'restoran');