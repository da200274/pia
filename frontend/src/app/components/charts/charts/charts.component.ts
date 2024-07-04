import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Rezervacija } from 'src/app/models/rezervacija';
import { FetchWaiterService } from 'src/app/services/fetch-waiter.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements AfterViewInit{
  @ViewChild('myChart1', { static: true }) myChart1!: ElementRef<HTMLCanvasElement>;
  @ViewChild('myChart2', { static: true }) myChart2!: ElementRef<HTMLCanvasElement>;
  @ViewChild('myChart3', { static: true }) myChart3!: ElementRef<HTMLCanvasElement>;

  constructor(
    private fetchServis: FetchWaiterService
  ) {
    Object.keys(this.reservation_per_day).forEach(day => {
      this.reservation_per_day[day] = 0;
    });
   }

  my_reservations: Rezervacija[] = []
  reservation_per_day: any = {
    'Monday': 0,
    'Tuesday': 0,
    'Wednesday': 0,
    'Thursday': 0,
    'Friday': 0,
    'Saturday': 0,
    'Sunday': 0
  };

  
  async ngAfterViewInit(): Promise<void> {
    await this.inicijalizuj();
    
    this.updateCharts();
  }

  async inicijalizuj(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let temp = localStorage.getItem("profil");
      if (!temp) {
        resolve();
        return;
      }

      this.fetchServis.reservations_for_waiter(temp).subscribe(
        res => {
          if (res) {
            this.my_reservations = res;

            this.my_reservations.forEach(reservation => {
              const dayOfWeek = new Date(reservation.datum_vreme_pocetka).getDay();
              const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
              this.reservation_per_day[dayName]++;
            });

            resolve();
          } else {
            reject('Failed to fetch reservations');
          }
        },
        err => {
          reject(err);
        }
      );
    });
  }

  updateCharts(): void {
    const ctx1 = this.myChart1.nativeElement.getContext('2d');
    if (ctx1) {
      new Chart(ctx1, {
        type: 'bar',
        data: {
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          datasets: [{
            label: '# of Reservations',
            data: [
              this.reservation_per_day['Monday'],
              this.reservation_per_day['Tuesday'],
              this.reservation_per_day['Wednesday'],
              this.reservation_per_day['Thursday'],
              this.reservation_per_day['Friday'],
              this.reservation_per_day['Saturday'],
              this.reservation_per_day['Sunday']
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    const ctx2 = this.myChart2.nativeElement.getContext('2d');
    if (ctx2) {
      new Chart(ctx2, {
        type: 'bar',
        data: {
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          datasets: [{
            label: '# of Reservations',
            data: [
              this.reservation_per_day['Monday'],
              this.reservation_per_day['Tuesday'],
              this.reservation_per_day['Wednesday'],
              this.reservation_per_day['Thursday'],
              this.reservation_per_day['Friday'],
              this.reservation_per_day['Saturday'],
              this.reservation_per_day['Sunday']
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
}
