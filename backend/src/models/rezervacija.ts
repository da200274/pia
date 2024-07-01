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
        komentar: String,
        ocena: Number
    },{
        versionKey:false
    }
);

export default mongoose.model('RezervacijaM', rezervacijaSchema, 'rezervacija');