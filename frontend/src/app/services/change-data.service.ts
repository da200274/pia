import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Poruka } from '../models/poruka';

@Injectable({
  providedIn: 'root'
})
export class ChangeDataService {

  constructor(private http: HttpClient) { }

  backendUrl = "http://localhost:4000"

  change(data: any){
    return this.http.post<Poruka>(`${this.backendUrl}/change/change`, data);
  }

}
