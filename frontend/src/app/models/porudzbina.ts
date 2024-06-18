import { Sadrzaj } from "./sadrzaj";

export class Porudzbina{
    _id: string = ""
    naziv: string = "";
    kupac: string = "";
    konobar: string = "";
    adresa: string = "";
    kontakt: string = "";
    cena: number = 0;
    status: number = 0;
    vreme_dostave: number = 0;
    kreirana_u: Date = new Date();
    azurirana_u: Date = new Date();
    sadrzaj: Sadrzaj[] = []

    excludeId(): any {
        const { _id, ...objectWithoutId } = this;
        return objectWithoutId;
    }
}