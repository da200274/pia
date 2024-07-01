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
  showed: boolean = false;
  selected_table: string = ""

  rezervacije: Rezervacija[] = []
  slobodni_stolovi: string[] = []
  zauzeti_stolovi: string[] = []
  restoran_ime: string = ""
  restoran_adresa: string = ""
  datum_vreme: Date|string = ""


  rezervisi(){

    this.check_constraints()
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
        this.showed = true
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
          this.showed = false
        }
      }
    )
  }

  zavrsi(){
    let temp = localStorage.getItem("profil")
    if(temp){
      this.insertServis.add_reservation(this.restoran_ime, temp, this.selected_table, this.datum_vreme, this.restoran_adresa).subscribe(
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

