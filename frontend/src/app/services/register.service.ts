import { Injectable } from '@angular/core';
import { Poruka } from '../models/poruka';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  backendUrl = "http://localhost:4000"

  register_user(korime: string, lozinka: string, pitanje: string, odgovor: string, ime: string, prezime: string, pol: string,
     adresa: string, kontakt: string, mejl: string, restoran: string, profilna: string,  tip: string){
    const data = {
      korime: korime,
      lozinka: lozinka,
      pitanje: pitanje,
      odgovor: odgovor,
      ime: ime,
      prezime: prezime,
      pol: pol,
      adresa: adresa,
      kontakt: kontakt, 
      imejl: mejl,
      profilna: profilna,
      radi_u: restoran,
      tip: tip
    }
    return this.http.post<Poruka>(`${this.backendUrl}/register/register`, data);
  }

  file_upload(file: File){
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<Poruka>(`${this.backendUrl}/register/add_photo`, formData);
  }

  update_photo(putanja: string, korime: string){
    const data = {
      korime: korime,
      profilna: putanja
    }
    console.log(putanja)
    return this.http.post<Poruka>(`${this.backendUrl}/register/update_photo`, data);
  }
}

