import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restoran } from 'src/app/models/restoran';
import { Rezervacija } from 'src/app/models/rezervacija';
import { Sto } from 'src/app/models/sto';
import { FetchService } from 'src/app/services/fetch.service';
import { InsertDataService } from 'src/app/services/insert-data.service';
import { ReserveService } from 'src/app/services/reserve.service';

@Component({
  selector: 'app-reservation-customer',
  templateUrl: './reservation-customer.component.html',
  styleUrls: ['./reservation-customer.component.css']
})
export class ReservationCustomerComponent implements OnInit{

  constructor(
    private reserveServis: ReserveService,
    private insertServis: InsertDataService,
    private fetchServis: FetchService,
    private router: Router
  ){}

  ngOnInit(): void {
    let temp = localStorage.getItem("restoran")
    if(!temp) return
    else this.restoran_ime = temp
    this.fetchServis.get_restaurant(this.restoran_ime).subscribe(
      res=>{
        if(res){
          this.restoran = res
          this.restoran_adresa = res.adresa
        }
      }
    )
  }

  opis: string = ""
  kap: number = 0
  message: string = ""
  datum: Date|string = ""
  vreme: string = ""
  sp: string[] = []

  rezervacije: Rezervacija[] = []
  slobodni_stolovi: string[] = []
  zauzeti_stolovi: string[] = []
  restoran_ime: string = ""
  restoran_adresa: string = ""
  restoran: Restoran = new Restoran()
  datum_vreme: Date|string = ""


  rezervisi(){
    this.check_constraints()
    if(this.vreme != ""){
      let datum = "2024-07-03"
      let provera_vremena = new Date(`${datum}T${this.vreme}Z`);
      
      let proveraHours = provera_vremena.getHours();
      let proveraMinutes = provera_vremena.getMinutes();

      console.log(provera_vremena)
      console.log(this.restoran.radno_vreme_pocetak)

      let pocetakHours = new Date(this.restoran.radno_vreme_pocetak).getHours();
      let pocetakMinutes = new Date(this.restoran.radno_vreme_pocetak).getMinutes();

      let krajHours = new Date(this.restoran.radno_vreme_kraj).getHours();
      let krajMinutes = new Date(this.restoran.radno_vreme_kraj).getMinutes();

      let proveraTotalMinutes = proveraHours * 60 + proveraMinutes;
      let pocetakTotalMinutes = pocetakHours * 60 + pocetakMinutes;
      let krajTotalMinutes = krajHours * 60 + krajMinutes
      if(krajTotalMinutes < pocetakTotalMinutes){
        krajTotalMinutes += (60 * (24 - pocetakHours + krajHours) - pocetakMinutes + krajMinutes)
      }

      if(pocetakTotalMinutes > proveraTotalMinutes){
        this.message = "Restoran nije otvoren u tom periodu"
      }
      else if(krajTotalMinutes < proveraTotalMinutes){
        this.message = "Restoran je ili zatvoren ili će biti zatvoren u toku opsluživanja rezervcije"
      }
    }
    if(this.message != ''){
      return;
    }
    this.zauzeti_stolovi = []
    this.datum_vreme = new Date(`${this.datum}T${this.vreme}Z`);
    this.reserveServis.get_reservations(this.datum_vreme, this.restoran_ime).subscribe(
      rez=>{
        if(rez) this.rezervacije = rez;
        for(let i = 0; i < this.rezervacije.length; i++){
          this.zauzeti_stolovi.push(this.rezervacije[i].sto_id)
        }
        this.svi_stolovi()
      }
    )

  }

  svi_stolovi(){
    console.log(this.zauzeti_stolovi)
    this.reserveServis.get_tables(this.restoran_ime, this.kap).subscribe(
      stolovi=>{
        let svi_stolovi: Sto[] = []
        if(stolovi) svi_stolovi = stolovi
        
        for(let i = 0; i < svi_stolovi.length; i++){
          this.slobodni_stolovi.push(svi_stolovi[i].sto_id)
        }

        for (let i = 0; i < this.zauzeti_stolovi.length; i++) {
          const zauzeti_sto = this.zauzeti_stolovi[i];
          this.slobodni_stolovi = this.slobodni_stolovi.filter(sto => sto !== zauzeti_sto);
        }

        if(this.slobodni_stolovi.length == 0){
          this.message = "Ne postoji slobodan sto u tom terminu."
        }
        else{
          this.zavrsi()
        }
      }
    )
  }

  zavrsi(){
    let temp = localStorage.getItem("profil")
    if(temp){
      this.insertServis.add_reservation(this.restoran_ime, temp, this.datum_vreme, this.restoran_adresa, this.kap).subscribe(
        msg=>{
          if(msg.poruka == "ok"){
            this.router.navigate(['restaurants'])
          }
        }
      )

    }
  }

  check_constraints(){
    if(this.kap <= 0){
      this.message = "Gosti moraju biti veći broj od 0."
      return
    }else if(this.vreme == '' || this.datum == ""){
      this.message = "Popunite datum i vreme."
      return
    }
    this.message = ''
  }

}

