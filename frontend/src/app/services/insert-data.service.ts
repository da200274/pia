import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Poruka } from '../models/poruka';
import { Porudzbina } from '../models/porudzbina';

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
}
