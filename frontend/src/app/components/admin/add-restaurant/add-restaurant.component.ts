import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Restoran } from 'src/app/models/restoran';
import { InsertDataService } from 'src/app/services/insert-data.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit{

  @ViewChild('canvas', { static: true }) myCanvas!: ElementRef;

  constructor(private insertServis: InsertDataService, private router: Router){}

  ngOnInit(): void {
    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    const context = canvas.getContext('2d');
    if (context) {
      context.strokeStyle = 'red';
      context.fillStyle = 'rgba(17, 0, 255, 0.5)';
      if (this.file1Data && context) {
        context.fillStyle = 'lightgray';
        context.fillRect(0, 0, canvas.width, canvas.height);

        this.drawLayout(context);
      }
    }
  }

  drawLayout(context: CanvasRenderingContext2D): void {
    if (this.file1Data) {
      // Draw kitchen
      this.drawRectangle(context, this.file1Data.kuhinja.koordinate, 'blue', 'Kuhinja');
      // Draw toilet
      this.drawRectangle(context, this.file1Data.toalet.koordinate, 'green', 'Toalet');
      // Draw tables
      this.file1Data.raspored_stolova.stolovi.forEach((sto: any) => {
        const label = `${sto.kapacitet}`;
        this.drawRectangle(context, sto.koordinate, 'red', label);
      });
    }
  }

  drawRectangle(context: CanvasRenderingContext2D, coordinates: number[], color: string, label: string) {
    // Check for overlaps with already drawn rectangles
    const rect = [coordinates[0], coordinates[1], coordinates[2], coordinates[3]];
    for (const drawnRect of this.drawnRectangles) {
      if (this.isOverlap(rect, drawnRect)) {
        this.message = `Rectangles overlap.`;
        return;
      }
    }
    
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

  isOverlap(rect1: number[], rect2: number[]): boolean {
    return !(rect1[0] >= rect2[2] || // rect1 is to the right of rect2
             rect1[2] <= rect2[0] || // rect1 is to the left of rect2
             rect1[1] >= rect2[3] || // rect1 is below rect2
             rect1[3] <= rect2[1]);  // rect1 is above rect2
  }
  
  private drawnRectangles: number[][] = [];
  file1Data: any;

  onFileSelected(event: Event, fileType: string): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const jsonData = JSON.parse(reader.result as string);
        if (fileType === 'file1') {
          this.file1Data = jsonData;
        }
        const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
        const context = canvas.getContext('2d');
        if (context) {
          context.fillStyle = 'lightgray'; // Change this to your desired background color
          context.fillRect(0, 0, canvas.width, canvas.height);

          this.drawLayout(context);
        }
      } catch (e) {
        console.error('Error parsing JSON:', e);
      }
    };

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };

    reader.readAsText(file);
  }

  dodaj_restoran(){
    this.check_constraints();
    let datum = "2024-07-03"
    let radno_vreme_pocetak = new Date(`${datum}T${this.vreme1}Z`);
    let radno_vreme_kraj= new Date(`${datum}T${this.vreme2}Z`);

    if(this.message == ""){
      const data = {
        naziv: this.naziv,
        tip: this.tip,
        adresa: this.adresa,
        kontakt: this.kontakt,
        kratak_opis: this.kratak_opis,
        mapa: this.mapa,
        radno_vreme_pocetak: radno_vreme_pocetak,
        radno_vreme_kraj: radno_vreme_kraj,
        raspored_stolova: this.file1Data.raspored_stolova,
        meni: this.file1Data.meni,
        kuhinja: this.file1Data.kuhinja,
        toalet: this.file1Data.toalet
      }

      this.insertServis.add_restaurant(data).subscribe(
        msg=>{
          if(msg.poruka == "ok"){
            this.router.navigate(['lists_admin'])
          }
        }
      )
    }
  }

  check_constraints(){
    if(this.naziv == "" || this.tip == "" || this.adresa == "" || this.kratak_opis == "" || this.kontakt == "" || this.vreme1 == "" || this.vreme2 == ""){
      this.message = "Svi podaci su obavezni."
      return
    }
    else if(this.file1Data == null){
      this.message = "Unesite JSON dokument."
      return
    }else if(this.file1Data.kuhinja == undefined){
      this.message = "Restoran mora imati kuhinju."
      return
    }
    else if(this.file1Data.toalet ==undefined){
      this.message = "Restoran mora imati toalet."
      return
    }
    else if(this.file1Data.raspored_stolova ==undefined){
      this.message = "Restoran mora imati stolove."
      return
    }
    else if(this.file1Data.raspored_stolova.stolovi.length < 3){
      this.message = "Restoran mora imati 3 ili više stolova."
      return
    }
    this.message = ""
  }

  naziv: string = ""
  tip: string = ""
  adresa: string = ""
  kratak_opis: string = ""
  kontakt: string = ""
  mapa: string = ""
  message: string = ""

  vreme1: string = ""
  vreme2: string = ""

  restoran: Restoran = new Restoran()
}
