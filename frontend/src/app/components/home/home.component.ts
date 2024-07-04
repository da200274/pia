import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/korisnik';
import { Restoran } from 'src/app/models/restoran';
import { FetchService } from 'src/app/services/fetch.service';
import { ReserveService } from 'src/app/services/reserve.service';
import { SearchService } from 'src/app/services/search.service';
import { SortService } from 'src/app/services/sort.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(
    private router: Router,
    private fetchServis: FetchService,
    private sortServis: SortService,
    private searchServis: SearchService,
    private reservationServis: ReserveService,
    private fb: FormBuilder
  ){
    this.searchForm = this.fb.group({
      naziv: [''],
      adresa: [''],
      tip: ['']
    });
  }

  ngOnInit(): void {
    this.fetchServis.all_restaurants().subscribe(
      rs=>{
        if(rs) this.restaurants = rs
        this.broj_restorana = this.restaurants.length
        this.fetchServis.count_customers().subscribe(
          rez=>{
            this.broj_gostiju = rez
            this.dohvati_brojke()
          }
        )
      }
    )
  }

  dohvati_brojke(){
    this.reservationServis.get_last_day().subscribe(
      dan=>{
        if(dan) this.broj_rezervacija_dan = dan
      }
    )

    this.reservationServis.get_last_week().subscribe(
      nedelja=>{
        if(nedelja) this.broj_rezervacija_nedelja = nedelja
      }
    )

    this.reservationServis.get_last_month().subscribe(
      mesec=>{
        if(mesec) this.broj_rezervacija_mesec = mesec
      }
    )

    this.fetchServis.all_waiters().subscribe(
      ws=>{
        if(ws) this.waiters = ws
        for(let i = 0; i <this.restaurants.length; i++){
          this.restaurants[i].radnici = []
          for(let j = 0; j < this.waiters.length; j++){
            if(this.restaurants[i].naziv == this.waiters[j].radi_u){
              this.restaurants[i].radnici.push(this.waiters[j])
            }
          }
        }
      }
    )
  }

  sortData(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.getSorted()
  }

  getSorted(){
    this.sortServis.sort(this.sortColumn, this.sortDirection).subscribe(
      rs=>{
        if(rs) this.restaurants = rs
      }
    )
  }

  search(): void {
    const formValue = this.searchForm.value;

    this.searchServis.search(formValue).subscribe(
      (data: Restoran[]) => {
        console.log(data)
        this.searched_restaurants = data;
      }
    );
  }
  searchForm: FormGroup;

  restaurants: Restoran[] = []
  waiters: Korisnik[] = []
  sortDirection: 'asc' | 'desc' = 'asc';
  sortColumn: string = '';
  searched_restaurants: Restoran[] = []

  broj_restorana: number = 0;
  broj_gostiju: number = 0;
  broj_rezervacija_dan: number = 0;
  broj_rezervacija_nedelja: number = 0;
  broj_rezervacija_mesec: number = 0
}
