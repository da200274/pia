import { Sadrzaj } from "./sadrzaj";

export class Porudzbina{
    naziv: string = "";
    kupac: string = "";
    konobar: string = "";
    adresa: string = "";
    kontakt: string = "";
    cena: number = 0;
    status: number = 0;
    vreme_dostave: string = ""
    sadrzaj: Sadrzaj[] = []
}