import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Poruka } from '../models/poruka';
import { Porudzbina } from '../models/porudzbina';
import { Restoran } from '../models/restoran';

@Injectable({
  providedIn: 'root'
})
export class InsertDataService {
  constructor(private http: HttpClient) { }

  backendUrl = "http://localhost:4000"
  add_order(p: Porudzbina){
    const data = {
      porudzbina: p
    }
    return this.http.post<Poruka>(`${this.backendUrl}/insert/order`, data);
  }

  add_restaurant(r: any){
    return this.http.post<Poruka>(`${this.backendUrl}/insert/restaurant`, r);
  }

  add_reservation(r: string, korime: string, datum_vreme: Date|string, adresa: string, kap: number){
    const data = {
      naziv_restorana: r,
      gost: korime,
      datum_vreme_pocetka: datum_vreme,
      status: 0,
      konobar: "",
      adresa: adresa,
      broj_ljudi: kap
    }
    return this.http.post<Poruka>(`${this.backendUrl}/insert/reservation`, data);
  }
}
