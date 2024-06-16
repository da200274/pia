import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korisnik } from '../models/korisnik';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  backendUrl = "http://localhost:4000"
  login(korime: string, lozinka: string){
    const data = {
      korime: korime,
      lozinka: lozinka
    }
    return this.http.post<Korisnik>(`${this.backendUrl}/login/login_korisnik`, data);
  }

  login_admin(korime: string, lozinka: string){
    const data = {
      korime: korime,
      lozinka: lozinka
    }
    return this.http.post<Korisnik>(`${this.backendUrl}/login/login_admin`, data);
  }

}
