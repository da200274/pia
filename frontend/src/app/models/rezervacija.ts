export class Rezervacija{
    _id: string = ""
    naziv_restorana: string = ""
    gost: string = ""
    konobar: string = ""
    sto_id: string = ""
    datum_vreme_pocetka: Date = new Date()
    datum_vreme_kraja: Date = new Date()
    status: number = 0;
    adresa: string = ""
    komentar: string = ""
    ocena: number = 0
}