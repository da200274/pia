import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restoran } from 'src/app/models/restoran';
import { FetchService } from 'src/app/services/fetch.service';
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
    private sortServis: SortService
  ){}

  ngOnInit(): void {
    this.fetchServis.all_restaurants().subscribe(
      rs=>{
        if(rs) this.restaurants = rs
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

  restaurants: Restoran[] = []
  sortDirection: 'asc' | 'desc' = 'asc';
  sortColumn: string = '';
}
