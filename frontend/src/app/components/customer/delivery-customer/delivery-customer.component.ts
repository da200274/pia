import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Porudzbina } from 'src/app/models/porudzbina';
import { FetchService } from 'src/app/services/fetch.service';
import { UpdateDataService } from 'src/app/services/update-data.service';

@Component({
  selector: 'app-delivery-customer',
  templateUrl: './delivery-customer.component.html',
  styleUrls: ['./delivery-customer.component.css']
})
export class DeliveryCustomerComponent implements OnInit{

  constructor(
    private fetchServis: FetchService,
    private updateServis: UpdateDataService,
    private datePipe: DatePipe
  ){}

  transform(datum: Date){
    const dateStr = new Date(datum).toISOString();
    
    const [datePart, timePart] = dateStr.split('T');
    const [hours, minutes] = timePart.split(':');
    
    const formattedDate = this.datePipe.transform(datePart, 'dd-MM-yyyy') || '';
    const formattedTime = `${hours}:${minutes}`;
    
    return `${formattedDate} ${formattedTime}`;
  }

  ngOnInit(): void {
    let temp = localStorage.getItem("profil")
    if(temp){
      this.korime = temp
    }
    this.inicijalizuj()
  }

  inicijalizuj(){
    this.dohvati_aktuelne()
    this.dohvati_arhivu()
  }

  async dohvati_aktuelne(){
    this.fetchServis.all_active_orders(this.korime).subscribe(
      async aktivne=>{
        if(aktivne){
          for(let i = 0; i < aktivne.length; i++){
            let updated = new Date(aktivne[i].azurirana_u)
            let now = new Date()
            
            updated.setMinutes(updated.getMinutes() + aktivne[i].vreme_dostave)

            console.log(updated)
            console.log(now)
            if(updated <= now){
              try {
                await firstValueFrom(this.updateServis.delivered_order(aktivne[i]._id));
              } catch (error) {
                console.error("An error occurred while delivering the order:", error);
              }
            }
            else{
              this.aktuelne_porudzbine.push(aktivne[i])
            }
          }
        }
      }
    )
  }

  dohvati_arhivu(){
    this.fetchServis.archive_orders(this.korime).subscribe(
      arh=>{
        if(arh){
          this.arhiva = arh
        }
      }
    )
  }

  arhiva: Porudzbina[] = []
  aktuelne_porudzbine: Porudzbina[] = []
  korime: string = ""
  
}
