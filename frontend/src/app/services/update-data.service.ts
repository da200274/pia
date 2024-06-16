import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Poruka } from '../models/poruka';

@Injectable({
  providedIn: 'root'
})
export class UpdateDataService {

  constructor(private http: HttpClient) { }

  backendUrl = "http://localhost:4000"
  accept(korime: string){
    const data = {
      korime: korime
    }
    return this.http.post<Poruka>(`${this.backendUrl}/update/accept`, data);
  }

  reject(korime: string){
    const data = {
      korime: korime
    }
    return this.http.post<Poruka>(`${this.backendUrl}/update/reject`, data);
  }

  ban(korime: string){
    const data = {
      korime: korime
    }
    return this.http.post<Poruka>(`${this.backendUrl}/update/ban`, data);
  }
}
