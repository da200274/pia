import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restoran } from 'src/app/models/restoran';
import { FetchService } from 'src/app/services/fetch.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit{

  constructor(private fetchServis: FetchService, private router: Router, private sanitizer: DomSanitizer){}

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

  restoran: Restoran = new Restoran()

}
