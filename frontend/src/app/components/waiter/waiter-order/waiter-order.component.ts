import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/korisnik';
import { Porudzbina } from 'src/app/models/porudzbina';
import { FetchWaiterService } from 'src/app/services/fetch-waiter.service';
import { UpdateDataService } from 'src/app/services/update-data.service';

@Component({
  selector: 'app-waiter-order',
  templateUrl: './waiter-order.component.html',
  styleUrls: ['./waiter-order.component.css']
})
export class WaiterOrderComponent implements OnInit{

  constructor(private fetchServis: FetchWaiterService, private router: Router, private updateServis: UpdateDataService){}

  ngOnInit(): void {
    let temp = localStorage.getItem("korisnik")
    if(temp){
      this.konobar = JSON.parse(temp)
    }
    this.inicijalizuj()
  }

  inicijalizuj(){
    this.fetchServis.get_orders(this.konobar.radi_u).subscribe(
      orders=>{
        if(orders){
          this.porudzbine = orders
        }
      }
    )
  }

  prikazi(s: Porudzbina){
    this.porudzbina = s;
    this.pokazan = true
  }

  prihvati(){
    if(!(this.vreme_dostave == 25 || this.vreme_dostave == 35 || this.vreme_dostave == 55)){
      this.message = "Selektuj vreme dostave"
      return
    }
    this.message = ""
    this.updateServis.accept_order(this.konobar.korime, this.porudzbina._id, this.vreme_dostave).subscribe(
      msg=>{
        if(msg.poruka == "ok"){
          this.inicijalizuj()
          this.pokazan = false
        }
      }
    )
  }

  odbij(){
    this.updateServis.reject_order(this.porudzbina._id).subscribe(
      msg=>{
        if(msg.poruka == "ok"){
          this.inicijalizuj()
          this.pokazan = false
        }
      }
    )
  }

  porudzbine: Porudzbina[] = []
  porudzbina: Porudzbina = new Porudzbina()
  pokazan: boolean = false
  konobar: Korisnik = new Korisnik()
  vreme_dostave: number = 0
  message: string = ""
}
