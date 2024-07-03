import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rezervacija } from 'src/app/models/rezervacija';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit{

  constructor(
    private fetchServis: FetchService,
    private router: Router,
    private datePipe: DatePipe
  ){}

  transform(datum: Date){
    return this.datePipe.transform(datum, 'dd-MM-yyyy HH:mm') || '';
  }

  ngOnInit(): void {
    let temp = localStorage.getItem("profil")
    if(temp) this.korime = temp
    this.fetchServis.archive_reservations(this.korime).subscribe(
      archive=>{
        if(archive){
          this.arhiva = archive
          this.dohvati_aktuelne()
        }
      }
    )
  }

  dohvati_aktuelne(){
    this.fetchServis.current_reservations(this.korime).subscribe(
      curr=>{
        if(curr){
          this.aktuelne_rezervacije = curr
        }
      }
    )
  }

  goto_review(id: string){
    localStorage.setItem("rezervacija", id)
    this.router.navigate(['review'])
  }

  aktuelne_rezervacije: Rezervacija[] = []
  arhiva: Rezervacija[] = []
  korime: string = ""
}
