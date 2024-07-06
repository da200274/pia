import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Porudzbina } from '../models/porudzbina';
import { Rezervacija } from '../models/rezervacija';
import { Poruka } from '../models/poruka';
import { Korisnik } from '../models/korisnik';

@Injectable({
  providedIn: 'root'
})
export class FetchWaiterService {

  constructor(private http: HttpClient) { }

  backendUrl = "http://localhost:4000"

  get_orders(radi_u: string){
    const data = {
      radi_u: radi_u
    }
    return this.http.post<Porudzbina[]>(`${this.backendUrl}/get_waiter/active_orders`, data);
  }

  
  reservations_for_waiter(naziv: string){
    const data = {
      konobar: naziv
    }
    return this.http.post<Rezervacija[]>(`${this.backendUrl}/get_waiter/reservations_for_waiter`, data);
  }

  current_reservations(naziv: string){
    const data = {
      konobar: naziv
    }
    return this.http.post<Rezervacija[]>(`${this.backendUrl}/get_waiter/current_reservation`, data);
  }

  all_reservations_2y(){
    return this.http.post<Rezervacija[]>(`${this.backendUrl}/get/2y`, "");
  }

  //not fetch but will work

  valid(id: string){
    const data = {
      id: id
    }
    return this.http.post<Poruka>(`${this.backendUrl}/update/valid_reservation`, data);
  }

  invalid(id: string, korime: string){
    const data = {
      id: id,
      korime: korime
    }
    return this.http.post<Poruka>(`${this.backendUrl}/update/invalid_reservation`, data);
  }

  waiters_of_restaurant(name: string){
    const data = {
      restoran: name
    }
    return this.http.post<Korisnik[]>(`${this.backendUrl}/get/all_waiters_from_restaurant`, data);
  }

  guests_for_waiter(name: string){
    const data = {
      korime: name
    }
    return this.http.post<number>(`${this.backendUrl}/get/guests_for_waiter`, data);
  }
}
