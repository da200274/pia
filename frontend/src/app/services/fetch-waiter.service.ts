import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Porudzbina } from '../models/porudzbina';

@Injectable({
  providedIn: 'root'
})
export class FetchWaiterService {

  constructor(private http: HttpClient) { }

  backendUrl = "http://localhost:4000"

  get_orders(){
    return this.http.post<Porudzbina[]>(`${this.backendUrl}/get_waiter/active_orders`, " ");
  }
}