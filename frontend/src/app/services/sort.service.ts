import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restoran } from '../models/restoran';

@Injectable({
  providedIn: 'root'
})
export class SortService {
  constructor(private http: HttpClient) { }

  backendUrl = "http://localhost:4000"

  sort(kolona: string, direction: string){
    const data = {
      kolona: kolona,
      direction: direction
    }
    return this.http.post<Restoran[]>(`${this.backendUrl}/sort/sort`, data);
  }
}
