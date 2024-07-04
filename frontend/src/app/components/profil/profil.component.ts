import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/korisnik';
import { FetchService } from 'src/app/services/fetch.service';
import { UpdateDataService } from 'src/app/services/update-data.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit{

  constructor(private router: Router, private fetchServis: FetchService, private updateDataServis: UpdateDataService){}
  ngOnInit(): void {
    let temp = localStorage.getItem("profil")
    let tip = localStorage.getItem("tip")
    if(temp && tip){
      this.korime = temp
      this.tip = tip
      this.fetchServis.user_by_korime(this.korime).subscribe(
        user=>{
          if(user){
            this.k = user
            this.fetched = true
          }
        }
      )
    }
  }

  update_data(){
    this.router.navigate(["update_data"])
  }

  
  change_password(){
    this.router.navigate(["change_password"])
  }

  deactivate(korime: string){
    this.updateDataServis.ban(korime).subscribe(
      data=>{
        if(data.poruka != "ok"){
          console.log("Neuspešno blokiranje korisnika.")
          return
        }
      }
    )
  }

  korime: string = ""
  tip: string = ""
  k: Korisnik = new Korisnik()
  fetched: boolean = false;

}
