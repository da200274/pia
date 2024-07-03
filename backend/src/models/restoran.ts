import mongoose, { mongo } from 'mongoose'

const stoSchema = new mongoose.Schema(
    {
        sto_id: String,
        kapacitet: { type: Number, required: true },
        koordinate: [Number]
    }
);

const rasporedSchema = new mongoose.Schema(
    {
        radno_vreme: String,
        stolovi: {
            type: [stoSchema],
            default: []
        }
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

const kuhinjaSchema = new mongoose.Schema(
    {
        koordinate: [Number]
    }
);

const toaletSchema = new mongoose.Schema(
    {
        koordinate: [Number]
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
        raspored_stolova: {
            type: rasporedSchema,
            default: () => ({ stolovi: [] })
        },
        kuhinja: kuhinjaSchema,
        radno_vreme_pocetak: Date,
        radno_vreme_kraj: Date,
        toalet: toaletSchema,
        meni: [meniSchema],
        recenzije: [recenzijaSchema]
    }
);

export default mongoose.model('RestoranM', restoranSchema, 'restoran');