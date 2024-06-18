import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Poruka } from '../models/poruka';

@Injectable({
  providedIn: 'root'
})
export class UpdateDataService {

  constructor(private http: HttpClient) { }

  backendUrl = "http://localhost:4000"
  accept_user(korime: string){
    const data = {
      korime: korime
    }
    return this.http.post<Poruka>(`${this.backendUrl}/update/accept_user`, data);
  }

  reject_user(korime: string){
    const data = {
      korime: korime
    }
    return this.http.post<Poruka>(`${this.backendUrl}/update/reject_user`, data);
  }

  ban(korime: string){
    const data = {
      korime: korime
    }
    return this.http.post<Poruka>(`${this.backendUrl}/update/ban`, data);
  }

  change_password(korime: string, lozinka: string){
    const data = {
      korime: korime,
      lozinka: lozinka
    }
    return this.http.post<Poruka>(`${this.backendUrl}/update/change_password`, data);
  }

  accept_order(korime: string, _id: string, vreme_dostave: number){
    
    const data = {
      korime: korime,
      id: _id,
      vreme_dostave: vreme_dostave
    }
    return this.http.post<Poruka>(`${this.backendUrl}/update/accept_offer`, data);
  }

  reject_order(_id: string){
    const data = {
      id: _id
    }
    return this.http.post<Poruka>(`${this.backendUrl}/update/reject_offer`, data);
  }
}
