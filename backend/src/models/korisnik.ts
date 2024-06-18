import mongoose from 'mongoose'

const korisnikSchema = new mongoose.Schema(
    {
        korime: String,
        lozinka: String,
        pitanje: String,
        odgovor: String,
        ime: String,
        prezime: String,
        pol: String,
        adresa: String,
        kontakt: String,
        imejl: String,
        tip: String,
        kartica: String,
        status: Number,
        profilna: String,
        radi_u: String
    },{
      versionKey:false  
    }
);

export default mongoose.model('KorisnikM', korisnikSchema, 'korisnik');