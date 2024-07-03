import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Korisnik } from 'src/app/models/korisnik';
import { Restoran } from 'src/app/models/restoran';
import { Rezervacija } from 'src/app/models/rezervacija';
import { FetchService } from 'src/app/services/fetch.service';
import { ReserveService } from 'src/app/services/reserve.service';
import { UpdateDataService } from 'src/app/services/update-data.service';

@Component({
  selector: 'app-waiter-reservations',
  templateUrl: './waiter-reservations.component.html',
  styleUrls: ['./waiter-reservations.component.css']
})
export class WaiterReservationsComponent implements OnInit{

  constructor(
    private fetchServis: FetchService,
    private reservationServis: ReserveService,
    private updateServis: UpdateDataService,
    private datePipe: DatePipe
  ){}

  ngOnInit(): void {
    this.inicijalizuj()
  }
  inicijalizuj(): Promise<void> {
    return new Promise((resolve, reject) => {
      let temp = localStorage.getItem("korisnik");
      if (!temp) {
        resolve();
        return;
      }
  
      this.korisnik = JSON.parse(temp);
      this.fetchServis.reservations_for_restaurant(this.korisnik.radi_u).subscribe(
        res => {
          if (res) this.aktuelne_rezervacije = res;
          this.dohvati_restoran().then(() => resolve());
        },
        error => reject(error)
      );
    });
  }
  
  dohvati_restoran(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.fetchServis.get_restaurant(this.korisnik.radi_u).subscribe(
        r => {
          if (r) this.restoran = r;
          resolve();
        },
        error => reject(error)
      );
    });
  }
  
  reinicijalizuj(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.stolovi_restorana = [];
      this.zauzeti_stolovi = [];
      this.slobodni_stolovi = [];
  
      for (let i = 0; i < this.restoran.raspored_stolova.stolovi.length; i++) {
        this.stolovi_restorana.push(this.restoran.raspored_stolova.stolovi[i].sto_id);
      }
  
      this.reservationServis.get_reservations(this.aktuelne_rezervacije[this.vise_index].datum_vreme_pocetka, this.restoran.naziv).subscribe(
        rez => {
          if (rez) {
            for (let i = 0; i < rez.length; i++) {
              this.zauzeti_stolovi.push(rez[i].sto_id);
            }
  
            this.slobodni_stolovi = this.stolovi_restorana.filter(sto =>
              !this.zauzeti_stolovi.some(zauzet => zauzet === sto)
            );
          }
          resolve();
        },
        error => reject(error)
      );
    });
  }

  
  @ViewChild('canvas') myCanvas!: ElementRef<HTMLCanvasElement>;

  drawLayout(context: CanvasRenderingContext2D): void {
    
    this.drawRectangle(context, this.restoran.kuhinja.koordinate, 'blue', 'Kuhinja');
    this.drawRectangle(context, this.restoran.toalet.koordinate, 'green', 'Toalet');
    this.restoran.raspored_stolova.stolovi.forEach((sto: any) => {
      const label = `${sto.kapacitet}:${sto.sto_id}`;

      if(this.zauzeti_stolovi.includes(sto.sto_id)){
        this.drawRectangle(context, sto.koordinate, 'red', label);
      }
      else{
        this.drawRectangle(context, sto.koordinate, 'yellow', label);
      }
    });
  }

  drawRectangle(context: CanvasRenderingContext2D, coordinates: number[], color: string, label: string) {
    const rect = [coordinates[0], coordinates[1], coordinates[2], coordinates[3]];
    
    context.fillStyle = color;
    const [x, y, width, height] = [coordinates[0], coordinates[1], coordinates[2] - coordinates[0], coordinates[3] - coordinates[1]];
    context.fillRect(x, y, width, height);

    context.fillStyle = 'black';
    context.font = '18px Arial';
    const textWidth = context.measureText(label).width;
    const textX = x + (width - textWidth) / 2;
    const textY = y + (height + 18) / 2 - 6; // Adjust for font size

    context.fillText(label, textX, textY);

    this.drawnRectangles.push(rect);
  }
  

  async vise(i: number){
    this.vise_index = i
    this.show_more = true;

    await this.reinicijalizuj()
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

  accept() {
    this.updateServis.accept_reservation(this.korisnik.korime, this.aktuelne_rezervacije[this.vise_index]._id, this.sto_selected).subscribe(
      msg => {
        this.show_more = false
        if (msg.poruka == "ok" && this.aktuelne_rezervacije.length > 1) {
          this.inicijalizuj().then(() => {
            return this.reinicijalizuj();
          }).catch(error => {
            console.error('Error:', error);
          });
        }
        else if(msg.poruka == "ok"){
          this.inicijalizuj()
        }
      }
    );
  }

  reject(){
    this.updateServis.reject_reservation(this.aktuelne_rezervacije[this.vise_index]._id).subscribe(
      msg => {
        this.show_more = false
        if (msg.poruka == "ok" && this.aktuelne_rezervacije.length > 1) {
          this.inicijalizuj().then(() => {
            return this.reinicijalizuj();
          }).catch(error => {
            console.error('Error:', error);
          });
        }
        else if(msg.poruka == "ok"){
          this.inicijalizuj()
        }
      }
    );
  }

  transform(datum: Date){
    return this.datePipe.transform(datum, 'dd-MM-yyyy HH:mm') || '';
  }


  aktuelne_rezervacije: Rezervacija[] = []
  korisnik: Korisnik = new Korisnik()
  restoran: Restoran = new Restoran()
  show_more: boolean = false
  private drawnRectangles: number[][] = [];
  slobodni_stolovi: string[] = []
  stolovi_restorana: string[] = []
  zauzeti_stolovi: string[] = []
  sto_selected: string = ""
  vise_index: number = 0
}
