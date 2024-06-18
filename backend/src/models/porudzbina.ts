import mongoose from 'mongoose'

const sadrzajSchema = new mongoose.Schema(
    {
        cena: Number,
        naziv: String,
        kolicina: Number
    }
);

const porudzbinaSchema = new mongoose.Schema(
    {
        naziv: String,
        kupac: String,
        konobar: String,
        adresa: String,
        kontakt: String,
        cena: Number,
        status: Number,
        vreme_dostave: Number,
        sadrzaj: [sadrzajSchema]
    },{
        versionKey:false,
        timestamps: { createdAt: 'kreirana_u', updatedAt: 'azurirana_u' }
    }
);

export default mongoose.model('PorudzbinaM', porudzbinaSchema, 'porudzbina');