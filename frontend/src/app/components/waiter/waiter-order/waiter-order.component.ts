import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Porudzbina } from 'src/app/models/porudzbina';
import { FetchWaiterService } from 'src/app/services/fetch-waiter.service';

@Component({
  selector: 'app-waiter-order',
  templateUrl: './waiter-order.component.html',
  styleUrls: ['./waiter-order.component.css']
})
export class WaiterOrderComponent implements OnInit{

  constructor(private fetchServis: FetchWaiterService, private router: Router){}

  ngOnInit(): void {
    this.inicijalizuj()
  }

  inicijalizuj(){
    this.fetchServis.get_orders().subscribe(
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

  }

  odbij(){

  }

  porudzbine: Porudzbina[] = []
  porudzbina: Porudzbina = new Porudzbina()
  pokazan: boolean = false
}
