import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Restoran } from 'src/app/models/restoran';
import { FetchService } from 'src/app/services/fetch.service';
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
  sortDirection: 'asc' | 'desc' = 'asc';
  sortColumn: string = '';
  searched_restaurants: Restoran[] = []
}
