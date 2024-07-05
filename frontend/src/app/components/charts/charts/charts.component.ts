import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Korisnik } from 'src/app/models/korisnik';
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
    await this.inicijalizuj1();
    await this.inicijalizuj2()
    await this.inicijalizuj3()
    
    this.updateCharts();
  }

  async inicijalizuj1(): Promise<void> {
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
              
              this.reservation_per_day[dayName] += reservation.broj_ljudi;
              
              console.log(this.reservation_per_day[dayName])
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

  imena_konobara: string[] = []
  kor: Korisnik = new Korisnik()
  data2: number[] = []

  async inicijalizuj2(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let temp = localStorage.getItem("korisnik");
      if (!temp) {
        resolve();
        return;
      }
      this.kor = JSON.parse(temp);

      this.fetchServis.waiters_of_restaurant(this.kor.radi_u).subscribe(
        async res => {
          if (res) {
            const waiterPromises = res.map(async (waiter, index) => {
              this.imena_konobara.push(waiter.korime);
              const num = await this.fetchServis.guests_for_waiter(waiter.korime).toPromise();
              console.log(num)
              if (num !== null && num !== undefined) {
                this.data2[index] = num;
              }
            });

            try {
              await Promise.all(waiterPromises);
              resolve();
            } catch (error) { reject('Failed to fetch guests for waiters'); }
          } else { reject('Failed to fetch waiters');}
        },
        err => { reject(err); }
      );
    });
  }

  all_reservations: Rezervacija[] = []
  reservation_per_day2: { [key: string]: number } = {
    'Monday': 0,
    'Tuesday': 0,
    'Wednesday': 0,
    'Thursday': 0,
    'Friday': 0,
    'Saturday': 0,
    'Sunday': 0
  };

  async inicijalizuj3(): Promise<void> {
    return new Promise<void>((resolve, reject) => {

      this.fetchServis.all_reservations_2y().subscribe(
        res => {
          if (res) {
            this.all_reservations = res;
            console.log(this.all_reservations)
            this.all_reservations.forEach(reservation => {
              const dayOfWeek = new Date(reservation.datum_vreme_pocetka).getDay();
              const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
              
              this.reservation_per_day2[dayName]++;
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
            label: "Broj rezervacija",
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
        type: 'pie',
        data: {
          labels:this.imena_konobara,
          datasets: [{
            label: 'Raspodela gostiju',
            data: this.data2,
            borderWidth: 1
          }]
        }
      });
    }

    const ctx3 = this.myChart3.nativeElement.getContext('2d');
    if(ctx3){
      /*const data = Object.values(this.reservation_per_day2);

      const numBins = 7; // or any number you need
      const maxValue = Math.max(...data);
      const minValue = Math.min(...data);
      const binWidth = (maxValue - minValue) / numBins;

      const bins = Array(numBins).fill(0);
      data.forEach(value => {
        const binIndex = Math.min(Math.floor((value - minValue) / binWidth), numBins - 1);
        bins[binIndex]++;
      });

      const binLabels = Array.from({ length: numBins }, (_, i) => {
        const start = minValue + i * binWidth;
        const end = start + binWidth;
        return `${start.toFixed(1)} - ${end.toFixed(1)}`;
      });

      new Chart(ctx3, {
        type: 'bar',
        data: {
          labels: binLabels,
          datasets: [{
            label: 'Frequency',
            data: bins,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Value Ranges'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Frequency'
              },
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: true,
              text: 'Histogram'
            }
          }
        }
      });*/
    }

  }
}
