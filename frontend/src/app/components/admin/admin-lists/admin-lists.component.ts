import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/korisnik';
import { FetchService } from 'src/app/services/fetch.service';
import { UpdateDataService } from 'src/app/services/update-data.service';

@Component({
  selector: 'app-admin-lists',
  templateUrl: './admin-lists.component.html',
  styleUrls: ['./admin-lists.component.css']
})
export class AdminListsComponent {
  constructor(
    private fetchServis: FetchService,
    private router: Router,
    private updateServis: UpdateDataService
  ){}

  ngOnInit(): void {
    this.initialize()
  }

  initialize(){
    this.fetchServis.all_active_users().subscribe(
      k =>{
        if(k) this.korisnici = k;
      }
    )
  }

  show_more(korime: string){
    localStorage.setItem("profil", korime)
    this.router.navigate(['profil'])
  }

  deblock(korime: string){
    this.updateServis.unblock(korime).subscribe(
      msg=>{
        if(msg.poruka == "ok"){
          this.initialize()
        }
      }
    )
  }

  korisnici: Korisnik[] = []

}
