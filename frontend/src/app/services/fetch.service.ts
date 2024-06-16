import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korisnik } from '../models/korisnik';

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
}
