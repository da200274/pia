import { Component, OnInit } from '@angular/core';
import { Korisnik } from 'src/app/models/korisnik';
import { Rezervacija } from 'src/app/models/rezervacija';
import { FetchWaiterService } from 'src/app/services/fetch-waiter.service';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-waiter-my-reservations',
  templateUrl: './waiter-my-reservations.component.html',
  styleUrls: ['./waiter-my-reservations.component.css']
})
export class WaiterMyReservationsComponent implements OnInit{

  constructor(
    private fetchServis: FetchWaiterService
  ){}

  ngOnInit(): void {
    this.inicijalizuj()
  }

  inicijalizuj(){
    let temp = localStorage.getItem("korisnik");
    if (!temp) {
      return;
    }

    this.korisnik = JSON.parse(temp);
    this.fetchServis.reservations_for_waiter(this.korisnik.korime).subscribe(
      res => {
        if (res) this.aktuelne_rezervacije = res;
        this.now.setMinutes(this.now.getMinutes() - 30)
      }
    );
  }

  compare(i: number){
    let datum = new Date(this.aktuelne_rezervacije[i].datum_vreme_pocetka)
    datum.setHours(datum.getHours() - 2)
    if(datum <= this.now) return true
    else return false
  }

  come(i: number){
    this.fetchServis.valid(this.aktuelne_rezervacije[i]._id).subscribe(
      msg=>{
        if(msg.poruka == "ok"){
          this.inicijalizuj()
        }
      }
    )
  }

  not_come(i: number){
    this.fetchServis.invalid(this.aktuelne_rezervacije[i]._id, this.aktuelne_rezervacije[i].gost).subscribe(
      msg=>{
        if(msg.poruka == "ok"){
          this.inicijalizuj()
        }
      }
    )
  }
  
  aktuelne_rezervacije: Rezervacija[] = []
  korisnik: Korisnik = new Korisnik()
  now: Date = new Date()
}
