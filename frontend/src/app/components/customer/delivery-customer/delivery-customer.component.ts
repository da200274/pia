import { Component, OnInit } from '@angular/core';
import { Porudzbina } from 'src/app/models/porudzbina';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-delivery-customer',
  templateUrl: './delivery-customer.component.html',
  styleUrls: ['./delivery-customer.component.css']
})
export class DeliveryCustomerComponent implements OnInit{

  constructor(private fetchServis: FetchService){}

  ngOnInit(): void {
    let temp = localStorage.getItem("profil")
    if(temp){
      this.korime = temp
    }
    this.inicijalizuj()
  }

  inicijalizuj(){
    this.dohvati_aktuelne()
    this.dohvati_arhivu()
  }

  dohvati_aktuelne(){
    this.fetchServis.all_active_orders(this.korime).subscribe(
      aktivne=>{
        if(aktivne){
          this.aktuelne_porudzbine = aktivne
        }
      }
    )
  }

  dohvati_arhivu(){
    this.fetchServis.archive(this.korime).subscribe(
      arh=>{
        if(arh){
          this.arhiva = arh
        }
      }
    )
  }

  arhiva: Porudzbina[] = []
  aktuelne_porudzbine: Porudzbina[] = []
  korime: string = ""
  
}
