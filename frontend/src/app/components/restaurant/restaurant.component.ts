import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restoran } from 'src/app/models/restoran';
import { FetchService } from 'src/app/services/fetch.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Porudzbina } from 'src/app/models/porudzbina';
import { Meni } from 'src/app/models/meni';
import { InsertDataService } from 'src/app/services/insert-data.service';
import { Korisnik } from 'src/app/models/korisnik';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit{

  constructor(private fetchServis: FetchService, private router: Router, private sanitizer: DomSanitizer, private insertServis: InsertDataService){}

  ngOnInit(): void {
    this.inicijalizuj();
  }

  inicijalizuj(){
    let temp = localStorage.getItem("restoran")
    if(temp){
      this.fetchServis.get_restaurant(temp).subscribe(
        r=>{
          if(r){
            this.restoran = r
          }
        }
      )
    }
  }

  getMapaUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.restoran.mapa);
  }

  dodaj(jelo: Meni){
    const postojiJelo = this.porudzbina.sadrzaj.find(item => item.naziv == jelo.naziv)
    if(postojiJelo){
      postojiJelo.kolicina += 1
    }
    else{
      this.porudzbina.sadrzaj.push({naziv: jelo.naziv, cena: jelo.cena, kolicina: 1})
    }
  }

  oduzmi(naziv: string){
    const postojiJelo = this.porudzbina.sadrzaj.find(item => item.naziv == naziv)
    if(postojiJelo){
      postojiJelo.kolicina -= 1
      if(postojiJelo.kolicina == 0){
        this.porudzbina.sadrzaj = this.porudzbina.sadrzaj.filter(item => item.naziv !== naziv)
      }
    }
  }

  obrisi(naziv: string){
    this.porudzbina.sadrzaj = this.porudzbina.sadrzaj.filter(item => item.naziv !== naziv)
  }

  poruci(){
    let temp = localStorage.getItem("korisnik")
    if(temp){
      this.korisnik = JSON.parse(temp)
    }
    this.porudzbina.adresa = this.korisnik.adresa
    this.porudzbina.kontakt = this.korisnik.kontakt
    this.porudzbina.kupac = this.korisnik.korime
    this.porudzbina.naziv = this.restoran.naziv
    this.porudzbina.status = 0
    this.izracunaj_cenu();
    const data = this.porudzbina.excludeId()
    this.insertServis.add_order(data).subscribe(
      msg=>{
        if(msg.poruka == "ok"){
          this.router.navigate(['restaurants'])
        }
      }
    )
  }

  izracunaj_cenu(){
    let cena = 0; 
    for(let i = 0; i < this.porudzbina.sadrzaj.length; i++){
      cena += this.porudzbina.sadrzaj[i].cena * this.porudzbina.sadrzaj[i].kolicina
    }
    this.porudzbina.cena = cena
  }

  restoran: Restoran = new Restoran()
  porudzbina: Porudzbina = new Porudzbina()
  korisnik: Korisnik = new Korisnik()
}
