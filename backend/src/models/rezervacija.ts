import mongoose from 'mongoose'

const rezervacijaSchema = new mongoose.Schema(
    {
        naziv_restorana: String,
        gost: String,
        konobar: String,
        sto_id: String,
        status: Number,
        datum_vreme_pocetka: Date,
        datum_vreme_kraja: Date,
        adresa: String,
        broj_ljudi: Number,
        komentar: String,
        ocena: Number
    },{
        versionKey:false,
        timestamps: { createdAt: 'kreirana_u'}
    }
);

export default mongoose.model('RezervacijaM', rezervacijaSchema, 'rezervacija');