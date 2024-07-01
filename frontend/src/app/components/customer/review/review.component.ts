import { Component } from '@angular/core';
import { UpdateDataService } from 'src/app/services/update-data.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {

  constructor(
    private updateServis: UpdateDataService
  ){}

  opis: string = ""
  hearts: number[] = [1, 2, 3, 4, 5];
  rating: number = 0;
  message: string = ""

  setRating(rating: number): void {
    this.rating = rating;
  }

  zavrsi(){
    if(this.rating == 0 || this.opis == ""){
      this.message = "Unesite sve podatke!"
      return
    }
    this.message = ""

  }
}
