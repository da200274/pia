import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Restoran } from '../models/restoran';

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
}
