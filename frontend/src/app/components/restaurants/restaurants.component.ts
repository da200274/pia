import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restoran } from 'src/app/models/restoran';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit{

  constructor(private fetchServis: FetchService, private router: Router){}

  ngOnInit(): void {
    this.inicijalizuj()
  }

  inicijalizuj(){
    this.fetchServis.all_restaurants().subscribe(
      rs=>{
        if(rs){
          this.restorani = rs
        }
      }
    )
  }

  goto_restaurant(naziv: string){
    localStorage.setItem("restoran", naziv)
    this.router.navigate(['restaurant'])
  }
  restorani: Restoran[] = []
}
