import { Korisnik } from "./korisnik";
import { Kuhinja } from "./kuhinja";
import { Meni } from "./meni";
import { Raspored } from "./raspored";
import { Recenzija } from "./recenzija";
import { Toalet } from "./toalet";

export class Restoran {
    naziv: string = "";
    tip: string = "";
    adresa: string = "";
    kratak_opis: string = "";
    mapa: string = ""
    kontakt: string = "";
    kuhinja: Kuhinja = new Kuhinja();
    radno_vreme_pocetak:Date = new Date();
    radno_vreme_kraj: Date = new Date()
    toalet: Toalet = new Toalet()
    raspored_stolova: Raspored = new Raspored();
    meni: Meni[] = [];
    recenzije: Recenzija[] = [];
    radnici: Korisnik[] = []
}