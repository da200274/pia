import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Restoran } from '../models/restoran';
import { Porudzbina } from '../models/porudzbina';
import { Rezervacija } from '../models/rezervacija';

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  constructor(private http: HttpClient) { }

  backendUrl = "http://localhost:4000"

  all_active_users(){
    return this.http.post<Korisnik[]>(`${this.backendUrl}/get/all_active_users`, " ");
  }

  all_pending_requests(){
    return this.http.post<Korisnik[]>(`${this.backendUrl}/get/all_pending_requests`, " ");
  }

  all_waiters(){
    return this.http.post<Korisnik[]>(`${this.backendUrl}/get/all_waiters`, " ");
  }

  user_by_korime(korime: string){
    const data = {
      korime: korime
    }
    return this.http.post<Korisnik>(`${this.backendUrl}/get/user_by_korime`, data);
  }

  all_restaurants(){
    return this.http.post<Restoran[]>(`${this.backendUrl}/get/all_restaurants`, " ");
  }

  get_restaurant(nazivP: string){
    const data = {
      naziv: nazivP
    }
    return this.http.post<Restoran>(`${this.backendUrl}/get/get_restaurant`, data);
  }

  all_active_orders(korime: string){
    const data = {
      korime: korime
    }
    return this.http.post<Porudzbina[]>(`${this.backendUrl}/get/get_active_orders`, data);
  }

  archive_orders(korime: string){
    const data = {
      korime: korime
    }
    return this.http.post<Porudzbina[]>(`${this.backendUrl}/get/archive_orders`, data);
  }

  archive_reservations(korime: string){
    const data = {
      gost: korime
    }
    return this.http.post<Rezervacija[]>(`${this.backendUrl}/get/archive_reservations`, data);
  }

  current_reservations(korime: string){
    const data = {
      gost: korime,
      status: 1
    }
    return this.http.post<Rezervacija[]>(`${this.backendUrl}/get/current_reservations`, data);
  }

  reservations_for_restaurant(naziv: string){
    const data = {
      naziv_restorana: naziv
    }
    return this.http.post<Rezervacija[]>(`${this.backendUrl}/get/reservations_for_restaurant`, data);
  }

  count_customers(){
    return this.http.post<number>(`${this.backendUrl}/get/count_customers`, "");
  }
}
