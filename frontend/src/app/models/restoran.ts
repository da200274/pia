import { Meni } from "./meni";
import { Raspored } from "./raspored";
import { Recenzija } from "./recenzija";

export class Restoran {
    naziv: string = "";
    tip: string = "";
    adresa: string = "";
    kratak_opis: string = "";
    mapa: string = ""
    kontakt: string = "";
    raspored_stolova: Raspored = new Raspored();
    meni: Meni[] = [];
    recenzije: Recenzija[] = [];
}