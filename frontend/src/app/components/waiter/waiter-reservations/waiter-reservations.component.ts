import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Korisnik } from 'src/app/models/korisnik';
import { Restoran } from 'src/app/models/restoran';
import { Rezervacija } from 'src/app/models/rezervacija';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-waiter-reservations',
  templateUrl: './waiter-reservations.component.html',
  styleUrls: ['./waiter-reservations.component.css']
})
export class WaiterReservationsComponent implements OnInit{

  constructor(
    private fetchServis: FetchService
  ){}

  ngOnInit(): void {
    let temp = localStorage.getItem("korisnik")
    if(!temp) return;
    this.korisnik = JSON.parse(temp)
    this.fetchServis.reservations_for_restaurant(this.korisnik.radi_u).subscribe(
      res=>{
        if(res)this.aktuelne_rezervacije = res
        this.dohvati_restoran()
      }
    )
  }

  dohvati_restoran(){
    this.fetchServis.get_restaurant(this.korisnik.radi_u).subscribe(
      r=>{
        if(r) this.restoran = r;
        console.log(r)
      }
    )
  }

  
  @ViewChild('canvas') myCanvas!: ElementRef<HTMLCanvasElement>;

  drawLayout(context: CanvasRenderingContext2D): void {
    
    this.drawRectangle(context, this.restoran.kuhinja.koordinate, 'blue', 'Kuhinja');
    // Draw toilet
    this.drawRectangle(context, this.restoran.toalet.koordinate, 'green', 'Toalet');
    // Draw tables
    this.restoran.raspored_stolova.stolovi.forEach((sto: any) => {
      const label = `${sto.kapacitet}`;
      this.drawRectangle(context, sto.koordinate, 'red', label);
    });
  }

  drawRectangle(context: CanvasRenderingContext2D, coordinates: number[], color: string, label: string) {
    // Check for overlaps with already drawn rectangles
    const rect = [coordinates[0], coordinates[1], coordinates[2], coordinates[3]];
    
    context.fillStyle = color;
    const [x, y, width, height] = [coordinates[0], coordinates[1], coordinates[2] - coordinates[0], coordinates[3] - coordinates[1]];
    context.fillRect(x, y, width, height);

    // Set the font size to 18px for better visibility
    context.fillStyle = 'black';
    context.font = '18px Arial';
    const textWidth = context.measureText(label).width;
    const textX = x + (width - textWidth) / 2;
    const textY = y + (height + 18) / 2 - 6; // Adjust for font size

    context.fillText(label, textX, textY);

    // Store the drawn rectangle coordinates
    this.drawnRectangles.push(rect);
  }

  vise(id: string){
    this.show_more = true
    this.show_more = true;
    setTimeout(() => { // Wait for the view to update
      const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
      const context = canvas.getContext('2d');
      if (context) {
        context.fillStyle = 'lightgray';
        context.fillRect(0, 0, canvas.width, canvas.height);
        this.drawLayout(context);
      }
    }, 0);
  }


  aktuelne_rezervacije: Rezervacija[] = []
  korisnik: Korisnik = new Korisnik()
  restoran: Restoran = new Restoran()
  show_more: boolean = false
  private drawnRectangles: number[][] = [];
}
