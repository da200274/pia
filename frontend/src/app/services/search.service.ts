import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restoran } from '../models/restoran';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) { }

  backendUrl = "http://localhost:4000"

  search(params: { naziv?: string, adresa?: string, tip?: string }){
    const body: { [key: string]: string | undefined } = {};

    if (params.naziv) {
      body['naziv'] = params.naziv;
    }
    if (params.adresa) {
      body['adresa'] = params.adresa;
    }
    if (params.tip) {
      body['tip'] = params.tip;
    }

    console.log(body);

    return this.http.post<Restoran[]>(`${this.backendUrl}/search/search`, body);
  }
}
