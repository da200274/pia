import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/korisnik';
import { FetchService } from 'src/app/services/fetch.service';
import { UpdateDataService } from 'src/app/services/update-data.service';

@Component({
  selector: 'app-admin-requests',
  templateUrl: './admin-requests.component.html',
  styleUrls: ['./admin-requests.component.css']
})
export class AdminRequestsComponent implements OnInit{
  constructor(private listServis: FetchService, private router: Router, private updateDataServis: UpdateDataService){}

  ngOnInit(): void {
    this.initialize()
  }

  initialize(){
    this.listServis.all_pending_requests().subscribe(
      k =>{
        if(k) this.zahtevi = k;
      }
    )
  }

  accept(korime: string){
    this.updateDataServis.accept_user(korime).subscribe(
      data=>{
        if(data.poruka != "ok"){
          console.log("Neuspešno prihvatanje korisnika.")
          return
        }
        this.initialize()
      }
    )
  }

  reject(korime: string){
    this.updateDataServis.reject_user(korime).subscribe(
      data=>{
        if(data.poruka != "ok"){
          console.log("Neuspešno odbijanje korisnika.")
          return
        }
        this.initialize()
      }
    )
  }

  show_more(korime: string){
    localStorage.setItem("profil", korime)
    this.router.navigate(['profil'])
  }

  zahtevi: Korisnik[] = []
}
