import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rezervacija } from '../models/rezervacija';
import { Sto } from '../models/sto';

@Injectable({
  providedIn: 'root'
})
export class ReserveService {
  constructor(private http: HttpClient) { }

  backendUrl = "http://localhost:4000"

  get_reservations(datum_vreme: Date,r: string){
    const data = {
      datum_vreme: datum_vreme,
      restoran: r
    }
    return this.http.post<Rezervacija[]>(`${this.backendUrl}/reservation/get_for_date`, data);
  }

  get_tables(r: string, kap: number){
    const data = {
      restoran: r,
      kapacitet: kap
    }
    return this.http.post<Sto[]>(`${this.backendUrl}/reservation/get_table`, data);
  }

  get_last_day(){
    return this.http.post<number>(`${this.backendUrl}/reservation/get_last_day`, "");
  }

  get_last_week(){
    return this.http.post<number>(`${this.backendUrl}/reservation/get_last_week`, "");
  }

  get_last_month(){
    return this.http.post<number>(`${this.backendUrl}/reservation/get_last_month`, "");
  }
}
