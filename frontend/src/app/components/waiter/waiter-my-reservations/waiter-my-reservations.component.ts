import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Korisnik } from 'src/app/models/korisnik';
import { Rezervacija } from 'src/app/models/rezervacija';
import { FetchWaiterService } from 'src/app/services/fetch-waiter.service';
import { UpdateDataService } from 'src/app/services/update-data.service';

@Component({
  selector: 'app-waiter-my-reservations',
  templateUrl: './waiter-my-reservations.component.html',
  styleUrls: ['./waiter-my-reservations.component.css']
})
export class WaiterMyReservationsComponent implements OnInit{

  constructor(
    private fetchServis: FetchWaiterService,
    private updateServis: UpdateDataService,
    private datePipe: DatePipe
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
        this.fetchServis.current_reservations(this.korisnik.korime).subscribe(
          res2=>{
            if(res2) this.trenutne_rezervacije = res2
            console.log(res2)
          }
        )
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

  extend(i: number){
    this.updateServis.extend(this.trenutne_rezervacije[i]._id, this.trenutne_rezervacije[i].datum_vreme_kraja, this.trenutne_rezervacije[i].sto_id,).subscribe(
      msg=>{
        if(msg.poruka == "ok"){
          this.inicijalizuj()
        }
        else{
          alert("Nije uspela ekstenzija vremena")
        }
      }
    )
  }

  transform(datum: Date){
    const dateStr = new Date(datum).toISOString();
    
    const [datePart, timePart] = dateStr.split('T');
    const [hours, minutes] = timePart.split(':');
    
    const formattedDate = this.datePipe.transform(datePart, 'dd-MM-yyyy') || '';
    const formattedTime = `${hours}:${minutes}`;
    
    return `${formattedDate} ${formattedTime}`;
  }
  
  aktuelne_rezervacije: Rezervacija[] = []
  trenutne_rezervacije: Rezervacija[] = []
  korisnik: Korisnik = new Korisnik()
  now: Date = new Date()
}
